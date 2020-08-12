import * as path from "path";
import * as cp from "child_process";
import { logger, jsonString } from "../utils/Logger";
import { getScriptParams } from "../utils/Params";
const TEMPLATE_FOLDER = "template-node-ms/";

export const CreateNodeMsCmd = (params) => {
  const { noCommit, projectName, useNpm, projectPath } = getScriptParams(
    params
  );
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
  cp.execSync(`cd ${serviceDir} && git init`);
  cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
  cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);
};
// childProcess.execSync(`cd ${fullServicePath} && yarn`, { stdio: "inherit" });
