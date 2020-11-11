import * as commander from 'commander';

export const GenerateServerlessCommand = (refProgram: commander.Command, cmdName: string, desc: string, action: any) => {
  refProgram
    .command(cmdName)
    .description(desc)
    .option('--noCommit', "Don't do a first commit")
    .option('--useNpm', 'Use npm to install dependencies')
    .option('-p, --projectPath <projectPath>', 'Generated project path')
    .option('--verbose', 'Output verbose info')
    .option('-d, --addDeps <addDeps...>', 'Install extra depedencies')
    .option('-D, --addDevDeps <addDevDeps...>', 'Install extra dev depedencies')
    .requiredOption('-pn, --projectName <projectName>', 'Project name')
    .action(action);
};
