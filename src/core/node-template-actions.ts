import { logger } from '../utils/logger';
import { execSync } from 'child_process';
import { join } from 'path';
import { copySync, moveSync, mkdirSync } from 'fs-extra';

export const createProject = (serviceDir: string, templatePath: string) => {
  logger.info('Creating service folder...');
  mkdirSync(serviceDir);
  logger.info('Copying files...');
  copySync(templatePath, serviceDir);
  // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
  // conflict with anything else
  moveSync(join(serviceDir, '.package.json'), join(serviceDir, 'package.json'));
  moveSync(join(serviceDir, 'gitignore'), join(serviceDir, '.gitignore'));
};

export const installNodeDeps = (serviceDir: string, useNpm?: boolean) => {
  logger.info('Installing dependencies...');
  execSync(`${useNpm ? 'npm i' : 'yarn'}`, {
    stdio: 'inherit',
    cwd: serviceDir,
  });
};

export const runLint = (serviceDir: string, useNpm?: boolean) => {
  logger.info('Running lint...');
  execSync(`${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`, {
    stdio: 'inherit',
    cwd: serviceDir,
  });
};
