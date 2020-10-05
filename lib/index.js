#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_node_serverless_1 = require("./scripts/create-node-serverless");
const commander_1 = require("commander");
const create_node_ms_1 = require("./scripts/create-node-ms");
commander_1.program.version('0.0.1', '-v, --version');
commander_1.program
    .command('node-serverless')
    .description('Create a serverless framework project with TypeScript')
    .option('--noCommit', "Don't do a first commit")
    .option('--useNpm', 'Use npm to install dependencies')
    .option('-p, --projectPath <projectPath>', 'Generated project path')
    .option('--verbose', 'Output verbose info')
    .requiredOption('-pn, --projectName <projectName>', 'Project name')
    .action(create_node_serverless_1.CreateNodeServerless);
commander_1.program
    .command('node-ms')
    .description('Generate a CLEAN nodejs project with TypeScript')
    .option('--noCommit', "Don't do a first commit")
    .option('--useNpm', 'Use npm to install dependencies')
    .option('-p, --projectPath <projectPath>', 'Generated project path')
    .requiredOption('-pn, --projectName <projectName>', 'Project name')
    .requiredOption('-e, --entityName <entityName>', 'Name of the first entity')
    .option('-ep, --entityPluralName <entityPluralName>', 'Pluralized name of the entity')
    .option('--verbose', 'Output verbose info')
    .action(create_node_ms_1.CreateNodeMsCmd);
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkVBQXdFO0FBQ3hFLHlDQUFvQztBQUNwQyw2REFBMkQ7QUFFM0QsbUJBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRTFDLG1CQUFPO0tBQ0osT0FBTyxDQUFDLGlCQUFpQixDQUFDO0tBQzFCLFdBQVcsQ0FBQyx1REFBdUQsQ0FBQztLQUNwRSxNQUFNLENBQUMsWUFBWSxFQUFFLHlCQUF5QixDQUFDO0tBQy9DLE1BQU0sQ0FBQyxVQUFVLEVBQUUsaUNBQWlDLENBQUM7S0FDckQsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLHdCQUF3QixDQUFDO0tBQ25FLE1BQU0sQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUM7S0FDMUMsY0FBYyxDQUFDLGtDQUFrQyxFQUFFLGNBQWMsQ0FBQztLQUNsRSxNQUFNLENBQUMsNkNBQW9CLENBQUMsQ0FBQztBQUVoQyxtQkFBTztLQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDbEIsV0FBVyxDQUFDLGlEQUFpRCxDQUFDO0tBQzlELE1BQU0sQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7S0FDL0MsTUFBTSxDQUFDLFVBQVUsRUFBRSxpQ0FBaUMsQ0FBQztLQUNyRCxNQUFNLENBQUMsaUNBQWlDLEVBQUUsd0JBQXdCLENBQUM7S0FDbkUsY0FBYyxDQUFDLGtDQUFrQyxFQUFFLGNBQWMsQ0FBQztLQUNsRSxjQUFjLENBQUMsK0JBQStCLEVBQUUsMEJBQTBCLENBQUM7S0FDM0UsTUFBTSxDQUFDLDRDQUE0QyxFQUFFLCtCQUErQixDQUFDO0tBQ3JGLE1BQU0sQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUM7S0FDMUMsTUFBTSxDQUFDLGdDQUFlLENBQUMsQ0FBQztBQUUzQixtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==