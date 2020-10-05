#!/usr/bin/env node
import { CreateNodeServerless } from './scripts/create-node-serverless';
import { program } from 'commander';
import { CreateNodeMsCmd } from './scripts/create-node-ms';

program.version('0.0.1', '-v, --version');

program
  .command('node-serverless')
  .description('Create a serverless framework project with TypeScript')
  .option('--noCommit', "Don't do a first commit")
  .option('--useNpm', 'Use npm to install dependencies')
  .option('-p, --projectPath <projectPath>', 'Generated project path')
  .option('--verbose', 'Output verbose info')
  .requiredOption('-pn, --projectName <projectName>', 'Project name')
  .action(CreateNodeServerless);

program
  .command('node-ms')
  .description('Generate a CLEAN nodejs project with TypeScript')
  .option('--noCommit', "Don't do a first commit")
  .option('--useNpm', 'Use npm to install dependencies')
  .option('-p, --projectPath <projectPath>', 'Generated project path')
  .requiredOption('-pn, --projectName <projectName>', 'Project name')
  .requiredOption('-e, --entityName <entityName>', 'Name of the first entity')
  .option('-ep, --entityPluralName <entityPluralName>', 'Pluralized name of the entity')
  .option('--verbose', 'Output verbose info')
  .action(CreateNodeMsCmd);

program.parse(process.argv);
