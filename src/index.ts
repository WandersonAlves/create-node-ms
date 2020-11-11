#!/usr/bin/env node
import { GenerateServerlessCommand } from './cmd/index';
import { CreateNodeServerlessExpress, CreateNodeServerlessLambda } from './scripts/create-node-serverless';
import { createCommand } from 'commander';
import { CreateNodeMsCmd } from './scripts/create-node-ms';

const program = createCommand();

program.version('0.0.1', '-v, --version');

GenerateServerlessCommand(
  program,
  'node-serverless-express',
  'Create a serverless framework project with TypeScript using aws-serverless-express',
  CreateNodeServerlessExpress,
);

GenerateServerlessCommand(
  program,
  'nse',
  'Create a serverless framework project with TypeScript using aws-serverless-express',
  CreateNodeServerlessExpress,
);

GenerateServerlessCommand(
  program,
  'node-serverless-lambda',
  'Create a serverless framework project with TypeScript',
  CreateNodeServerlessLambda,
);

GenerateServerlessCommand(program, 'nsl', 'Create a serverless framework project with TypeScript', CreateNodeServerlessLambda);

program
  .command('node-ms')
  .description('Generate a CLEAN nodejs project with TypeScript')
  .option('--noCommit', "Don't do a first commit")
  .option('--useNpm', 'Use npm to install dependencies')
  .option('-p, --projectPath <projectPath>', 'Generated project path')
  .requiredOption('-pn, --projectName <projectName>', 'Project name')
  .requiredOption('-e, --entityName <entityName>', 'Name of the first entity')
  .option('-d, --addDeps <addDeps...>', 'Install extra depedencies')
  .option('-D, --addDevDeps <addDevDeps...>', 'Install extra dev depedencies')
  .option('-ep, --entityPluralName <entityPluralName>', 'Pluralized name of the entity')
  .option('--verbose', 'Output verbose info')
  .action(CreateNodeMsCmd);

program.parse(process.argv);
