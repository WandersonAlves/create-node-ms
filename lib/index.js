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
    .option('-p, --path <projectPath>', 'Generated project path')
    .requiredOption('-pn, --projectName <projectName>', 'Project name')
    .requiredOption('-e, --entityName <entityName>', 'Name of the first entity')
    .option('-ep, --entityPluralName <entityPluralName>', 'Pluralized name of the entity')
    .option('--verbose', 'Output verbose info')
    .action(create_node_ms_1.CreateNodeMsCmd);
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBb0M7QUFDcEMsNkRBQTJEO0FBRTNELG1CQUFPO0tBQ0osT0FBTyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUM7S0FDakMsV0FBVyxDQUFDLGlEQUFpRCxDQUFDO0tBQzlELE1BQU0sQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7S0FDL0MsTUFBTSxDQUFDLFVBQVUsRUFBRSxpQ0FBaUMsQ0FBQztLQUNyRCxNQUFNLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUM7S0FDNUQsY0FBYyxDQUFDLGtDQUFrQyxFQUFFLGNBQWMsQ0FBQztLQUNsRSxjQUFjLENBQUMsK0JBQStCLEVBQUUsMEJBQTBCLENBQUM7S0FDM0UsTUFBTSxDQUFDLDRDQUE0QyxFQUFFLCtCQUErQixDQUFDO0tBQ3JGLE1BQU0sQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUM7S0FDMUMsTUFBTSxDQUFDLGdDQUFlLENBQUMsQ0FBQztBQUUzQixtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==