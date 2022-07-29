#!/usr/bin/env node
import { GenerateServerlessCommand, GenerateUserInputCommand } from './cmd/index';
import { CreateExpressProject, CreateNodeServerlessExpress, CreateNodeServerlessLambda } from './scripts/create-node-serverless';
import { createCommand } from 'commander';

const program = createCommand();

program.version('0.0.1', '-v, --version');

GenerateServerlessCommand(
  program,
  'serverless-express',
  'Create a serverless project with TypeScript and ExpressJS',
  CreateNodeServerlessExpress,
);

GenerateServerlessCommand(
  program,
  'serverless-lambda',
  'Create a serverless project with TypeScript',
  CreateNodeServerlessLambda,
);

GenerateServerlessCommand(program, 'express', 'Create a ExpressJS project with TypeScript', CreateExpressProject);
GenerateUserInputCommand(program);
program.parse(process.argv);
