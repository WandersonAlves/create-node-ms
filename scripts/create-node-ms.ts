import * as path from "path";
import * as cp from "child_process";
import { logger, jsonString } from "../utils/logger";
import { capitalizeString } from "../utils/miscUtils";
import { processTemplate } from "../utils/templateProcessing";

const TEMPLATE_FOLDER = "template-node-ms/";

export const CreateNodeMsCmd = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  entityName,
  entityPluralName,
  verbose
}: {
  noCommit: boolean;
  projectName: string;
  useNpm: boolean;
  projectPath: string;
  entityName: string;
  entityPluralName: string;
  verbose: boolean;
}) => {
  const entityNameLowerCase = entityName.toLowerCase();
  const entitiesNameLowerCase = entityPluralName
    ? entityPluralName.toLowerCase()
    : entityNameLowerCase + "s";
  const entitiesNameCapitalized = capitalizeString(entitiesNameLowerCase);
  const entityNameCapitalized = capitalizeString(entityNameLowerCase);

  logger.level = verbose ? 'verbose' : 'info'

  logger.verbose(
    `create-node-ms params: ${jsonString({
      noCommit,
      projectName,
      useNpm,
      projectPath,
      entityName,
      entityPluralName,
    })}`
  );

  const rootDir = path.join(__filename);
  logger.verbose(`RootDir: ${rootDir}`);
  const currentDir = cp.execSync("pwd").toString().trim();
  logger.verbose(`CurrentDir: ${currentDir}`);
  const serviceDir = `${currentDir}/${projectName}`;
  logger.verbose(`ServiceDir: ${serviceDir}`);
  const cpTemplatePath = path.join(rootDir, "..", "..", "..", TEMPLATE_FOLDER);
  logger.verbose(`CPTemplateDir: ${cpTemplatePath}`);
  const cpTemplatePackageJson = path.join(cpTemplatePath, ".package.json");
  logger.verbose(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);

  logger.info('Creating service folder...');
  cp.execSync(`mkdir ${projectName}`);
  logger.info('Copying files...');
  cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
  cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);

  logger.info('Processing template...');
  await processTemplate(
    serviceDir,
    [
      ["entity", entityNameLowerCase],
      ["Entity", entityNameCapitalized],
      ["entities", entitiesNameLowerCase],
      ["Entities", entitiesNameCapitalized],
    ],
    [
      ["entity", entityNameLowerCase],
      ["Entity", entityNameCapitalized],
      ["entities", entitiesNameLowerCase],
      ["Entities", entitiesNameCapitalized],
    ]
  );

  logger.info('Installing depedencies...');
  cp.execSync(`cd ${serviceDir} && ${useNpm ? "npm i" : "yarn"}`, {
    stdio: "inherit",
  });

  if (!noCommit) {
    logger.info("Setup git...");
    cp.execSync(
      `cd ${serviceDir} && git init && git add . && git commit -m "feat: first commit :rocket:"`,
      {
        stdio: "inherit",
      }
    );
  }
  logger.info(`Done!\ncd to ${serviceDir}`);
};
