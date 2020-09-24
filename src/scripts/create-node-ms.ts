import { gitInit, gitFirstCommit } from '../core/git-actions';
import { installNodeDeps, runLint, createNodeProject } from '../core/node-template-actions';
import { logger, jsonString } from '../utils/logger';
import { capitalizeString } from '../utils/string-utils';
import { processTemplate, RenamingParams } from '../core/template-processing';
import { join } from 'path';
import { execSync } from 'child_process';

export const CreateNodeMsCmd = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  entityName,
  entityPluralName,
  verbose,
}: {
  noCommit: boolean;
  projectName: string;
  useNpm: boolean;
  projectPath: string;
  entityName: string;
  entityPluralName: string;
  verbose: boolean;
}) => {
  const TEMPLATE_FOLDER = 'template-node-ms/';
  const entityNameLowerCase = entityName.toLowerCase();
  const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
  const entitiesNameCapitalized = capitalizeString(entitiesNameLowerCase);
  const entityNameCapitalized = capitalizeString(entityNameLowerCase);

  logger.level = verbose ? 'debug' : 'info';

  logger.verbose(
    `create-node-ms params: ${jsonString({
      noCommit,
      projectName,
      useNpm,
      projectPath,
      entityName,
      entityPluralName,
    })}`,
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
  const templatePath = join(rootDir, '..', '..', TEMPLATE_FOLDER);
  logger.debug(`TemplatePath: ${templatePath}`);

  // Now we have all folder references. The heavy work begins now...
  createNodeProject(serviceDir, templatePath);

  const fileContentRenaming: RenamingParams = [
    ['D_entity_D', entityNameLowerCase],
    ['D_Entity_D', entityNameCapitalized],
    ['D_entities_D', entitiesNameLowerCase],
    ['D_Entities_D', entitiesNameCapitalized],
    ['D_ProjectName_D', projectName],
  ];

  const fileNameRenaming: RenamingParams = [
    ['entity', entityNameLowerCase],
    ['Entity', entityNameCapitalized],
    ['entities', entitiesNameLowerCase],
    ['Entities', entitiesNameCapitalized],
  ];

  await processTemplate(serviceDir, fileContentRenaming, fileNameRenaming, fileName =>
    logger.verbose(fileName, { label: 'FileRename' }),
  );

  installNodeDeps(serviceDir, useNpm);
  runLint(serviceDir, useNpm);

  if (!noCommit) {
    gitInit(serviceDir);
    gitFirstCommit(serviceDir);
  }
  logger.info(`Done! cd to ${serviceDir}`);
};
