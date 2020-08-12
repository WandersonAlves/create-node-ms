import { program } from "commander";
import { CreateTemplateCmd } from "./scripts/create-template";

program
  .version("0.0.1", "-v, --version")
  .description("Generate a CLEAN nodejs project with TypeScript")
  .option("--noCommit", "Don't do a first commit")
  .option("--useNpm", "Use npm to install dependencies")
  .option("-p, --path <projectPath>", "Generated project path")
  .requiredOption("-pn, --projectName <projectName>", "Project name")
  .action(CreateTemplateCmd);

program.parse(process.argv);
