import * as path from 'path';
import * as cp from 'child_process';
import { logger, jsonString } from '../utils/logger';
import { capitalizeString } from '../utils/miscUtils';
import { processTemplate } from '../utils/templateProcessing';

const TEMPLATE_FOLDER = 'template-node-ms/';

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
  const entityNameLowerCase = entityName.toLowerCase();
  const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
  const entitiesNameCapitalized = capitalizeString(entitiesNameLowerCase);
  const entityNameCapitalized = capitalizeString(entityNameLowerCase);

  logger.level = verbose ? 'verbose' : 'info';

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
  const rootDir = path.join(__dirname);
  logger.verbose(`RootDir: ${rootDir}`);
  // Get the current folder
  const currentDir = cp.execSync('pwd').toString().trim();
  logger.verbose(`CurrentDir: ${currentDir}`);
  // Maybe the user sets a --projectPath option
  // We join the currentDir with the projectPath to get the final path to output the template
  const serviceDir = path.join(path.join(currentDir, projectPath || ''), projectName);
  logger.verbose(`ServiceDir: ${serviceDir}`);
  // This is the path of the template
  // We need this to copy files and rename contents
  const cpTemplatePath = path.join(rootDir, '..', '..', TEMPLATE_FOLDER);
  logger.verbose(`CPTemplateDir: ${cpTemplatePath}`);
  // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
  // conflict with anything else
  const cpTemplatePackageJson = path.join(cpTemplatePath, '.package.json');
  logger.verbose(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);

  // Now we have all folder references. The heavy work begins now...
  logger.info('Creating service folder...');
  cp.execSync(`mkdir ${serviceDir}`);
  logger.info('Copying files...');
  cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
  cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);

  logger.info('Processing template...');
  await processTemplate(
    serviceDir,
    [
      ['D_entity_D', entityNameLowerCase],
      ['D_Entity_D', entityNameCapitalized],
      ['D_entities_D', entitiesNameLowerCase],
      ['D_Entities_D', entitiesNameCapitalized],
      ['D_ProjectName_D', projectName],
    ],
    [
      ['entity', entityNameLowerCase],
      ['Entity', entityNameCapitalized],
      ['entities', entitiesNameLowerCase],
      ['Entities', entitiesNameCapitalized],
    ],
    fileName => logger.verbose(fileName, { label: 'FileRename' }),
  );

  logger.info('Installing dependencies...');
  cp.execSync(`cd ${serviceDir} && ${useNpm ? 'npm i' : 'yarn'}`, {
    stdio: 'inherit',
  });

  logger.info('Running lint...');
  cp.execSync(`cd ${serviceDir} && ${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`);

  if (!noCommit) {
    logger.info('Setup git...');
    cp.execSync(`cd ${serviceDir} && git init && git add . && git commit -m "feat: first commit :rocket:"`, {
      stdio: 'inherit',
    });
  }
  logger.info(`Done! cd to ${serviceDir}`);
};
