import { logger } from './../utils/logger';
import { execSync } from 'child_process';

/**
 * Given a list of commands, validates if they exists on the environment
 *
 * If a command don't exists, then finishes the execution of template and log
 * which commands are found or not
 *
 * @param cmmds A array of commands to be validated
 */
export const environmentVerification = (cmmds: string[]) => {
  const label = 'environmentVerification';

  const hasCommand = (cmd: string): boolean => {
    try {
      execSync(`which ${cmd}`);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validations: Array<{ cmd: string; exists: boolean }> = [
    ...cmmds
      .filter(cmd => cmd)
      .map(cmd => ({
        cmd,
        exists: hasCommand(cmd),
      })),
  ];

  const missingEnv = validations.filter(val => (val.exists ? false : true));

  validations.forEach(val =>
    val.exists ? logger.info(`✅ '${val.cmd}' found!`, { label }) : logger.error(`⛔️ '${val.cmd}' not found :(`, { label }),
  );

  return missingEnv;
};
