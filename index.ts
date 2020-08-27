#!/usr/bin/env node
import { program } from 'commander';
import { CreateNodeMsCmd } from './scripts/create-node-ms';

program
  .version('0.0.1', '-v, --version')
  .description('Generate a CLEAN nodejs project with TypeScript')
  .requiredOption('-pn, --projectName <projectName>', 'Project name')
  .requiredOption('-e, --entityName <entityName>', 'Name of the first entity')
  .option('--noCommit', "Don't do a first commit")
  .option('--useNpm', 'Use npm to install dependencies')
  .option('-p, --projectPath <projectPath>', 'Generated project path')
  .option('-ep, --entityPluralName <entityPluralName>', 'Pluralized name of the entity')
  .option('--verbose', 'Output verbose info')
  .action(CreateNodeMsCmd);

program.parse(process.argv);
