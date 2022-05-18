#!/usr/bin/env node
import { GenerateServerlessCommand } from './cmd/index';
import { CreateExpressProject, CreateNodeServerlessExpress, CreateNodeServerlessLambda } from './scripts/create-node-serverless';
import { createCommand } from 'commander';

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

GenerateServerlessCommand(program, 'express', 'Create a ExpressJS project with TypeScript', CreateExpressProject);

GenerateServerlessCommand(program, 'nsl', 'Create a serverless framework project with TypeScript', CreateNodeServerlessLambda);

program.parse(process.argv);
