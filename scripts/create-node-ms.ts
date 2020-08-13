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
}: {
  noCommit: boolean;
  projectName: string;
  useNpm: boolean;
  projectPath: string;
  entityName: string;
  entityPluralName: string;
}) => {
  const entityNameLowerCase = entityName.toLowerCase();
  const entitiesNameLowerCase = entityPluralName
    ? entityPluralName.toLowerCase()
    : entityNameLowerCase + "s";
  const entitiesNameCapitalized = capitalizeString(entitiesNameLowerCase);
  const entityNameCapitalized = capitalizeString(entityNameLowerCase);

  logger.debug(
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
  logger.debug(`RootDir: ${rootDir}`);
  const currentDir = cp.execSync("pwd").toString().trim();
  logger.debug(`CurrentDir: ${currentDir}`);
  const serviceDir = `${currentDir}/${projectName}`;
  logger.debug(`ServiceDir: ${serviceDir}`);
  const cpTemplatePath = path.join(rootDir, "..", "..", "..", TEMPLATE_FOLDER);
  logger.debug(`CPTemplateDir: ${cpTemplatePath}`);
  const cpTemplatePackageJson = path.join(cpTemplatePath, ".package.json");
  logger.debug(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);

  cp.execSync(`mkdir ${projectName}`);
  cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
  cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);

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

  cp.execSync(`cd ${serviceDir} && ${useNpm ? "npm i" : "yarn"}`, {
    stdio: "inherit",
  });

  if (!noCommit) {
    cp.execSync(
      `cd ${serviceDir} && git init && git add . && git commit -m "feat: first commit :rocket:"`,
      {
        stdio: "inherit",
      }
    );
  }
};
