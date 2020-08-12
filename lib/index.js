#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_node_ms_1 = require("./scripts/create-node-ms");
commander_1.program
    .version("0.0.1", "-v, --version")
    .description("Generate a CLEAN nodejs project with TypeScript")
    .option("--noCommit", "Don't do a first commit")
    .option("--useNpm", "Use npm to install dependencies")
    .option("-p, --path <projectPath>", "Generated project path")
    .requiredOption("-pn, --projectName <projectName>", "Project name")
    .action(create_node_ms_1.CreateNodeMsCmd);
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBb0M7QUFDcEMsNkRBQTJEO0FBRTNELG1CQUFPO0tBQ0osT0FBTyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUM7S0FDakMsV0FBVyxDQUFDLGlEQUFpRCxDQUFDO0tBQzlELE1BQU0sQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7S0FDL0MsTUFBTSxDQUFDLFVBQVUsRUFBRSxpQ0FBaUMsQ0FBQztLQUNyRCxNQUFNLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUM7S0FDNUQsY0FBYyxDQUFDLGtDQUFrQyxFQUFFLGNBQWMsQ0FBQztLQUNsRSxNQUFNLENBQUMsZ0NBQWUsQ0FBQyxDQUFDO0FBRTNCLG1CQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9