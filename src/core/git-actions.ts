import { logger } from '../utils/logger';
import { execSync } from 'child_process';

export const gitInit = (serviceDir: string) => {
  logger.info('Starting git...');
  const stdout = execSync('git init -b main', {
    cwd: serviceDir,
  });
  logger.info(stdout.toString(), { label: 'git' });
};

export const gitFirstCommit = (serviceDir: string) => {
  logger.info('Doing first commit, yay!');
  try {
    const stdout = execSync('git add . && git commit -m "feat: first commit :rocket:"', {
      cwd: serviceDir,
    });
    logger.info(stdout.toString(), { label: 'git' });
  } catch (e) {
    logger.error(
      'Error when trying to make a commit. Please check if you have a user.email and user.name in your git global config',
    );
    process.exit(1);
  }
};
