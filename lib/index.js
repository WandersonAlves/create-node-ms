#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_node_ms_1 = require("./scripts/create-node-ms");
commander_1.program
    .version('0.0.1', '-v, --version')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUNBQW9DO0FBQ3BDLDZEQUEyRDtBQUUzRCxtQkFBTztLQUNKLE9BQU8sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDO0tBQ2pDLFdBQVcsQ0FBQyxpREFBaUQsQ0FBQztLQUM5RCxNQUFNLENBQUMsWUFBWSxFQUFFLHlCQUF5QixDQUFDO0tBQy9DLE1BQU0sQ0FBQyxVQUFVLEVBQUUsaUNBQWlDLENBQUM7S0FDckQsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLHdCQUF3QixDQUFDO0tBQ25FLGNBQWMsQ0FBQyxrQ0FBa0MsRUFBRSxjQUFjLENBQUM7S0FDbEUsY0FBYyxDQUFDLCtCQUErQixFQUFFLDBCQUEwQixDQUFDO0tBQzNFLE1BQU0sQ0FBQyw0Q0FBNEMsRUFBRSwrQkFBK0IsQ0FBQztLQUNyRixNQUFNLENBQUMsV0FBVyxFQUFFLHFCQUFxQixDQUFDO0tBQzFDLE1BQU0sQ0FBQyxnQ0FBZSxDQUFDLENBQUM7QUFFM0IsbUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=