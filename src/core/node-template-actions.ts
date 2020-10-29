import { logger } from '../utils/logger';
import { execSync } from 'child_process';
import { join } from 'path';
import { copySync, moveSync, mkdirSync, copy } from 'fs-extra';

export const createNodeProject = (serviceDir: string, templatePath: string, sharedFilesPath?: string) => {
  logger.info('Creating service folder...', { label: 'template' });
  mkdirSync(serviceDir);
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
  const stdout = execSync(`${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`, {
    cwd: serviceDir,
  });
  logger.verbose(stdout.toString(), { label: 'install' });
};
