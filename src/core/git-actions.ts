import { logger } from '../utils/logger';
import { execSync } from 'child_process';

export const gitInit = (serviceDir: string) => {
  logger.info('Starting git...');
  execSync('git init', {
    stdio: 'inherit',
    cwd: serviceDir,
  });
};

export const gitFirstCommit = (serviceDir: string) => {
  logger.info('Doing first commit, yay...');
  execSync('git add . && git commit -m "feat: first commit :rocket:"', {
    stdio: 'inherit',
    cwd: serviceDir,
  });
};
