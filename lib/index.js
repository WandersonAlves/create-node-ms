#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./cmd/index");
const create_node_serverless_1 = require("./scripts/create-node-serverless");
const commander_1 = require("commander");
const create_node_ms_1 = require("./scripts/create-node-ms");
const program = commander_1.createCommand();
program.version('0.0.1', '-v, --version');
index_1.GenerateServerlessCommand(program, 'node-serverless-express', 'Create a serverless framework project with TypeScript using aws-serverless-express', create_node_serverless_1.CreateNodeServerlessExpress);
index_1.GenerateServerlessCommand(program, 'nse', 'Create a serverless framework project with TypeScript using aws-serverless-express', create_node_serverless_1.CreateNodeServerlessExpress);
index_1.GenerateServerlessCommand(program, 'node-serverless-lambda', 'Create a serverless framework project with TypeScript', create_node_serverless_1.CreateNodeServerlessLambda);
index_1.GenerateServerlessCommand(program, 'nsl', 'Create a serverless framework project with TypeScript', create_node_serverless_1.CreateNodeServerlessLambda);
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
    .action(create_node_ms_1.CreateNodeMsCmd);
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXdEO0FBQ3hELDZFQUEyRztBQUMzRyx5Q0FBMEM7QUFDMUMsNkRBQTJEO0FBRTNELE1BQU0sT0FBTyxHQUFHLHlCQUFhLEVBQUUsQ0FBQztBQUVoQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztBQUUxQyxpQ0FBeUIsQ0FDdkIsT0FBTyxFQUNQLHlCQUF5QixFQUN6QixvRkFBb0YsRUFDcEYsb0RBQTJCLENBQzVCLENBQUM7QUFFRixpQ0FBeUIsQ0FDdkIsT0FBTyxFQUNQLEtBQUssRUFDTCxvRkFBb0YsRUFDcEYsb0RBQTJCLENBQzVCLENBQUM7QUFFRixpQ0FBeUIsQ0FDdkIsT0FBTyxFQUNQLHdCQUF3QixFQUN4Qix1REFBdUQsRUFDdkQsbURBQTBCLENBQzNCLENBQUM7QUFFRixpQ0FBeUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLHVEQUF1RCxFQUFFLG1EQUEwQixDQUFDLENBQUM7QUFFL0gsT0FBTztLQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDbEIsV0FBVyxDQUFDLGlEQUFpRCxDQUFDO0tBQzlELE1BQU0sQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7S0FDL0MsTUFBTSxDQUFDLFVBQVUsRUFBRSxpQ0FBaUMsQ0FBQztLQUNyRCxNQUFNLENBQUMsaUNBQWlDLEVBQUUsd0JBQXdCLENBQUM7S0FDbkUsY0FBYyxDQUFDLGtDQUFrQyxFQUFFLGNBQWMsQ0FBQztLQUNsRSxjQUFjLENBQUMsK0JBQStCLEVBQUUsMEJBQTBCLENBQUM7S0FDM0UsTUFBTSxDQUFDLDRCQUE0QixFQUFFLDJCQUEyQixDQUFDO0tBQ2pFLE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRSwrQkFBK0IsQ0FBQztLQUMzRSxNQUFNLENBQUMsNENBQTRDLEVBQUUsK0JBQStCLENBQUM7S0FDckYsTUFBTSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQztLQUMxQyxNQUFNLENBQUMsZ0NBQWUsQ0FBQyxDQUFDO0FBRTNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=