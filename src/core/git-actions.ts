import { logger } from '../utils/logger';
import { execSync } from 'child_process';

export const gitInit = (serviceDir: string) => {
  logger.info('Setup git...');
  execSync(`cd ${serviceDir} && git init`, {
    stdio: 'inherit',
  });
};

export const gitFirstCommit = (serviceDir: string) => {
  logger.info('Setup git...');
  execSync(`cd ${serviceDir} && git add . && git commit -m "feat: first commit :rocket:"`, {
    stdio: 'inherit',
  });
};
