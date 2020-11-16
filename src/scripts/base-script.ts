import { environmentVerification } from './../core/validations';
import { gitFirstCommit, gitInit } from './../core/git-actions';
import {
  createNodeProject,
  installExtraDeps,
  installExtraDevDeps,
  installNodeDeps,
  runLint,
} from './../core/node-template-actions';
import { processTemplate, RenamingParams } from './../core/template-processing';
import { execSync } from 'child_process';
import { join } from 'path';
import { jsonString, logger } from './../utils/logger';
import { removeSync } from 'fs-extra';

interface GenerateNodeProjectParams {
  projectPath: string;
  projectName: string;
  TEMPLATE_FOLDER: string;
  SHARED_TEMPLATE_FOLDER?: string;
  entityNameLowerCase?: string;
  entityNameCapitalized?: string;
  entitiesNameLowerCase?: string;
  entitiesNameCapitalized?: string;
  useNpm?: boolean;
  noCommit?: boolean;
  verbose?: boolean;
  addDeps?: string[];
  addDevDeps?: string[];
}

export const GenerateNodeProject = async ({
  projectPath,
  projectName,
  TEMPLATE_FOLDER,
  SHARED_TEMPLATE_FOLDER,
  entitiesNameCapitalized,
  entitiesNameLowerCase,
  entityNameCapitalized,
  entityNameLowerCase,
  noCommit,
  useNpm,
  verbose,
  addDeps,
  addDevDeps,
}: GenerateNodeProjectParams) => {
  logger.level = verbose ? 'debug' : 'info';
  logger.verbose(
    jsonString({
      TEMPLATE_FOLDER,
      SHARED_TEMPLATE_FOLDER,
      projectName,
      projectPath,
      noCommit,
      useNpm,
      verbose,
      addDeps,
      addDevDeps,
    }),
    { label: 'params' },
  );
  // Get the current running script dir
  // It can be "src/scripts" or "lib/scripts" (dev and npx, global context)
  const rootDir = join(__dirname);
  logger.debug(`RootDir: ${rootDir}`);
  // Get the current folder
  const currentDir = execSync('pwd').toString().trim();
  logger.debug(`CurrentDir: ${currentDir}`);
  // Maybe the user sets a --projectPath option
  // We join the currentDir with the projectPath to get the final path to output the template
  const serviceDir = join(join(currentDir, projectPath || ''), projectName);
  logger.debug(`ServiceDir: ${serviceDir}`);
  // This is the path of the template
  // We need this to copy files and rename contents
  const templatePath = join(rootDir, '..', '..', './templates', TEMPLATE_FOLDER);
  logger.debug(`TemplatePath: ${templatePath}`);

  const sharedTemplatePath = join(rootDir, '..', '..', './shared-templates', SHARED_TEMPLATE_FOLDER);
  logger.debug(`SharedTemplatePath: ${sharedTemplatePath}`);

  const missingEnv = environmentVerification([useNpm ? 'npm' : 'yarn', noCommit ? undefined : 'git']);

  if (missingEnv.some(e => e.cmd === 'yarn' && e.exists === false)) {
    useNpm = true;
    missingEnv.shift();
    logger.warn('Yarn not found, using npm instead', { label: 'environmentVerification' });
  }

  if (missingEnv.length) {
    logger.error('Fix the errors above', { label: 'environmentVerification' });
    process.exit(1);
  }

  logger.info('🐱 Everything went well', { label: 'environmentVerification' });

  // Now we have all folder references. The heavy work begins now...
  createNodeProject(serviceDir, templatePath, sharedTemplatePath);

  // If user runs nse, delete cases folder
  if (TEMPLATE_FOLDER === 'template-node-serverless-express') {
    removeSync(join(serviceDir, 'src', 'cases'));
  }

  const fileContentRenaming: RenamingParams = [
    ['D_entity_D', entityNameLowerCase],
    ['D_Entity_D', entityNameCapitalized],
    ['D_entities_D', entitiesNameLowerCase],
    ['D_Entities_D', entitiesNameCapitalized],
    ['D_ProjectName_D', projectName],
    ['D_npyarn_D', useNpm ? 'npm run' : 'yarn'],
  ];

  const fileNameRenaming: RenamingParams = [
    ['entity', entityNameLowerCase],
    ['Entity', entityNameCapitalized],
    ['entities', entitiesNameLowerCase],
    ['Entities', entitiesNameCapitalized],
  ];

  logger.info('Processing template...', { label: 'template' });
  await processTemplate(serviceDir, fileContentRenaming, fileNameRenaming, fileName =>
    logger.verbose(fileName, { label: 'template' }),
  );

  if (!noCommit) {
    gitInit(serviceDir);
  }

  installNodeDeps(serviceDir, useNpm);

  if (addDeps.length) {
    installExtraDeps(serviceDir, addDeps, useNpm);
  }
  if (addDevDeps.length) {
    installExtraDevDeps(serviceDir, addDevDeps, useNpm);
  }

  runLint(serviceDir, useNpm);

  if (!noCommit) {
    gitFirstCommit(serviceDir);
  }

  logger.info(`Done! cd to ${serviceDir}`);
};
