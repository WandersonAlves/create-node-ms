import { logger } from '../utils/logger';
import { execSync } from 'child_process';
import { join } from 'path';
import { copySync, moveSync, mkdirSync } from 'fs-extra';

export const createNodeProject = (serviceDir: string, templatePath: string, sharedFilesPath?: string) => {
  logger.info('Creating service folder...', { label: 'template' });
  try {
    mkdirSync(serviceDir);
  } catch (e) {
    logger.error(`Folder at path ${serviceDir} already exists. Delete it or chose another project name`);
    process.exit(1);
  }
  logger.info('Copying files...', { label: 'template' });
  copySync(templatePath, serviceDir);
  if (sharedFilesPath) {
    logger.info('Copying shared files...', { label: 'template' });
    copySync(sharedFilesPath, serviceDir);
  }
  // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
  // conflict with anything else
  moveSync(join(serviceDir, '.package.json'), join(serviceDir, 'package.json'));
  moveSync(join(serviceDir, 'gitignore'), join(serviceDir, '.gitignore'));
  moveSync(join(serviceDir, 'env'), join(serviceDir, '.env'));
};

export const installNodeDeps = (serviceDir: string, useNpm?: boolean) => {
  logger.info('Installing dependencies...', { label: 'install' });
  execSync(`${useNpm ? 'npm i' : 'yarn'}`, {
    stdio: 'inherit',
    cwd: serviceDir,
  });
};

export const runLint = (serviceDir: string, useNpm?: boolean) => {
  logger.info('Running lint...', { label: 'install' });
  execSync(`${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`, {
    cwd: serviceDir,
    stdio: 'inherit',
  });
};

export const installExtraDeps = (serviceDir: string, packages: string[], useNpm?: boolean) => {
  logger.info('Installing extra depedencies...', { label: 'install' });
  execSync(`${useNpm ? 'npm i' : 'yarn add'} ${packages.join(' ')}`, { stdio: 'inherit', cwd: serviceDir });
};

export const installExtraDevDeps = (serviceDir: string, packages: string[], useNpm?: boolean) => {
  logger.info('Installing extra dev depedencies...', { label: 'install' });
  execSync(`${useNpm ? 'npm i' : 'yarn add'} ${packages.join(' ')} ${useNpm ? '--save-dev' : '-D'}`, {
    stdio: 'inherit',
    cwd: serviceDir,
  });
};

interface GetPathsParams {
  projectPath: string;
  projectName: string;
  TEMPLATE_FOLDER: string;
  SHARED_TEMPLATE_FOLDER: string;
}

export const getPaths = ({ projectPath, projectName, SHARED_TEMPLATE_FOLDER, TEMPLATE_FOLDER }: GetPathsParams) => {
  const rootPath = join(__dirname);
  logger.debug(`RootPath: ${rootPath}`);
  // Get the current folder
  const currentPath = process.env.PWD;
  logger.debug(`CurrentPath: ${currentPath}`);
  // Maybe the user sets a --projectPath option
  // We join the currentDir with the projectPath to get the final path to output the template
  const genTemplatePath = join(join(currentPath, projectPath || ''), projectName);
  logger.debug(`ServiceDir: ${genTemplatePath}`);
  // This is the path of the template
  // We need this to copy files and rename contents
  const templatePath = join(rootPath, '..', '..', './templates', TEMPLATE_FOLDER);
  logger.debug(`TemplatePath: ${templatePath}`);

  const sharedTemplatePath = join(rootPath, '..', '..', './shared-templates', SHARED_TEMPLATE_FOLDER);
  logger.debug(`SharedTemplatePath: ${sharedTemplatePath}`);
  return { genTemplatePath, templatePath, sharedTemplatePath };
};
