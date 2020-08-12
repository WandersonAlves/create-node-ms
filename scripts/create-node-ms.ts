import * as path from "path";
import * as cp from "child_process";
import { logger, jsonString } from "../utils/Logger";
import { getScriptParams } from "../utils/Params";
import { getFileList, renameContent, capitalizeString } from "../utils/Files";
import { renameSync } from "fs";
const TEMPLATE_FOLDER = "template-node-ms/";

export const CreateNodeMsCmd = async (params) => {
  const { noCommit, projectName, useNpm, projectPath, entityName, entityPluralName } = getScriptParams(
    params
  );
  const entityNameLowerCase = entityName.toLowerCase();
  const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
  const entitiesNameCapitalized = capitalizeString(entitiesNameLowerCase)
  const entityNameCapitalized = capitalizeString(entityNameLowerCase);

  logger.debug(`create-node-ms params: ${jsonString(getScriptParams(params))}`);
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

  const files: string[] = await getFileList(serviceDir);
  for (const file of files) {
    logger.debug(file, { label: "FileRename" });
    renameContent(
      file,
      ["entity", entityNameLowerCase],
      ["Entity", entityNameCapitalized],
      ["entities", entitiesNameLowerCase],
      ["Entities", entitiesNameCapitalized]
    );
    if (
      file.includes("entity") ||
      file.includes("Entity") ||
      file.includes("Entities")
    ) {
      renameSync(
        file,
        file
          .replace("entity", entitiesNameLowerCase)
          .replace("Entity", entityNameCapitalized)
          .replace("Entities", entitiesNameCapitalized)
      );
    }
  }
  cp.execSync(`cd ${serviceDir} && ${useNpm ? "npm i" : "yarn"}`, {
    stdio: "inherit",
  });
};
