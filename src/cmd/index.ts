import * as commander from 'commander';
import { UserInputGenerator } from '../scripts/user-input';

export const GenerateServerlessCommand = (
  refProgram: commander.Command,
  cmdName: string,
  desc: string,
  action: (...args: any[]) => void | Promise<void>,
) => {
  refProgram
    .command(cmdName)
    .description(desc)
    .argument('<projectName>', 'Project name')
    .option('--noCommit', "Don't do a first commit")
    .option('--useNpm', 'Use npm to install dependencies')
    .option('-p, --projectPath <projectPath>', 'Generated project path')
    .option('--verbose', 'Output verbose info')
    .option('-d, --addDeps <addDeps...>', 'Install extra depedencies')
    .option('-D, --addDevDeps <addDevDeps...>', 'Install extra dev depedencies')
    .action(action);
};

export const GenerateUserInputCommand = (refProgram: commander.Command) => {
  refProgram.command('create').description('Wizard to create your project').action(UserInputGenerator);
};
