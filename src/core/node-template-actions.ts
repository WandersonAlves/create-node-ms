import { logger } from '../utils/logger';
import { execSync } from 'child_process';
import { join } from 'path';

export const createProject = (serviceDir: string, templatePath: string) => {
  logger.info('Creating service folder...');
  execSync(`mkdir ${serviceDir}`);
  logger.info('Copying files...');
  execSync(`cp -r ${templatePath}. ${serviceDir}/`);
  // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
  // conflict with anything else
  execSync(`cp -r ${join(templatePath, '.package.json')} ${serviceDir}/package.json`);
};

export const installNodeDeps = (serviceDir: string, useNpm?: boolean) => {
  logger.info('Installing dependencies...');
  execSync(`cd ${serviceDir} && ${useNpm ? 'npm i' : 'yarn'}`, {
    stdio: 'inherit',
  });
};

export const runLint = (serviceDir: string, useNpm?: boolean) => {
  logger.info('Running lint...');
  execSync(`cd ${serviceDir} && ${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`);
};
