#!/usr/bin/env node
import { GenerateServerlessCommand, GenerateUserInputCommand } from './cmd/index';
import { CreateExpressProject, CreateNodeServerlessExpress, CreateNodeServerlessLambda } from './scripts/create-node-serverless';
import { createCommand } from 'commander';
import { GenerateNodeProjectParams } from './utils/types';

const program = createCommand();

program
  .name('create-node-ms')
  .description('A generator for microservices with Clean Architecture in Node')
  .version(process.env.npm_package_version, '-v, --version');

GenerateServerlessCommand(
  program,
  'serverless-express',
  'Create a serverless project with TypeScript and ExpressJS',
  (projectName: string, options: GenerateNodeProjectParams) => {
    options.projectName = projectName;
    CreateNodeServerlessExpress(options);
  },
);

GenerateServerlessCommand(
  program,
  'serverless-lambda',
  'Create a serverless project with TypeScript',
  (projectName: string, options: GenerateNodeProjectParams) => {
    options.projectName = projectName;
    CreateNodeServerlessLambda(options);
  },
);

GenerateServerlessCommand(program, 'express', 'Create a ExpressJS project with TypeScript', CreateExpressProject);
GenerateUserInputCommand(program);
program.parse(process.argv);
