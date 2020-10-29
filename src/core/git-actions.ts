import { logger } from '../utils/logger';
import { execSync } from 'child_process';

export const gitInit = (serviceDir: string) => {
  logger.info('Starting git...');
  const stdout = execSync('git init', {
    cwd: serviceDir,
  });
  logger.info(stdout.toString(), { label: 'git' });
};

export const gitFirstCommit = (serviceDir: string) => {
  logger.info('Doing first commit, yay...');
  const stdout = execSync('git add . && git commit -m "feat: first commit :rocket:"', {
    cwd: serviceDir,
  });
  logger.info(stdout.toString(), { label: 'git' });
};
