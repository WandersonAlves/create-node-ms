import { environmentVerification } from './../core/validations';
import { gitFirstCommit, gitInit } from './../core/git-actions';
import {
  createNodeProject,
  getPaths,
  installExtraDeps,
  installExtraDevDeps,
  installNodeDeps,
  runLint,
  runUnitTests,
} from './../core/node-template-actions';
import { processTemplate, RenamingParams } from './../core/template-processing';
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
  const { genTemplatePath, templatePath, sharedTemplatePath } = getPaths({
    TEMPLATE_FOLDER,
    SHARED_TEMPLATE_FOLDER,
    projectName,
    projectPath,
  });

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
  createNodeProject(genTemplatePath, templatePath, sharedTemplatePath);

  // If user runs nse, delete cases folder
  if (TEMPLATE_FOLDER === 'template-node-serverless-express') {
    removeSync(join(genTemplatePath, 'src', 'cases'));
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
  await processTemplate(genTemplatePath, fileContentRenaming, fileNameRenaming, fileName =>
    logger.verbose(fileName, { label: 'template' }),
  );

  if (!noCommit) {
    gitInit(genTemplatePath);
  }

  installNodeDeps(genTemplatePath, useNpm);

  if (addDeps?.length) {
    installExtraDeps(genTemplatePath, addDeps, useNpm);
  }
  if (addDevDeps?.length) {
    installExtraDevDeps(genTemplatePath, addDevDeps, useNpm);
  }

  runLint(genTemplatePath, useNpm);
  runUnitTests(genTemplatePath, useNpm);

  if (!noCommit) {
    gitFirstCommit(genTemplatePath);
  }

  logger.info(`Done! cd to ${genTemplatePath}`);
};
