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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFvQztBQUNwQyw2REFBMkQ7QUFFM0QsbUJBQU87S0FDSixPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztLQUNqQyxXQUFXLENBQUMsaURBQWlELENBQUM7S0FDOUQsTUFBTSxDQUFDLFlBQVksRUFBRSx5QkFBeUIsQ0FBQztLQUMvQyxNQUFNLENBQUMsVUFBVSxFQUFFLGlDQUFpQyxDQUFDO0tBQ3JELE1BQU0sQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQztLQUM1RCxjQUFjLENBQUMsa0NBQWtDLEVBQUUsY0FBYyxDQUFDO0tBQ2xFLE1BQU0sQ0FBQyxnQ0FBZSxDQUFDLENBQUM7QUFFM0IsbUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=