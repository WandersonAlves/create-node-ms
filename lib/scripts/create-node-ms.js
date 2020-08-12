"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodeMsCmd = void 0;
const path = require("path");
const cp = require("child_process");
const Logger_1 = require("../utils/Logger");
const Params_1 = require("../utils/Params");
const TEMPLATE_FOLDER = "template-node-ms/";
exports.CreateNodeMsCmd = (params) => {
    const { noCommit, projectName, useNpm, projectPath } = Params_1.getScriptParams(params);
    Logger_1.logger.debug(`create-node-ms params: ${Logger_1.jsonString(Params_1.getScriptParams(params))}`);
    const rootDir = path.join(__filename);
    Logger_1.logger.debug(`RootDir: ${rootDir}`);
    const currentDir = cp.execSync("pwd").toString().trim();
    Logger_1.logger.debug(`CurrentDir: ${currentDir}`);
    const serviceDir = `${currentDir}/${projectName}`;
    Logger_1.logger.debug(`ServiceDir: ${serviceDir}`);
    const cpTemplatePath = path.join(rootDir, "..", "..", "..", TEMPLATE_FOLDER);
    Logger_1.logger.debug(`CPTemplateDir: ${cpTemplatePath}`);
    const cpTemplatePackageJson = path.join(cpTemplatePath, ".package.json");
    Logger_1.logger.debug(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);
    cp.execSync(`mkdir ${projectName}`);
    cp.execSync(`cd ${serviceDir} && git init`);
    cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
    cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);
};
// childProcess.execSync(`cd ${fullServicePath} && yarn`, { stdio: "inherit" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1ub2RlLW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE2QjtBQUM3QixvQ0FBb0M7QUFDcEMsNENBQXFEO0FBQ3JELDRDQUFrRDtBQUNsRCxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUUvQixRQUFBLGVBQWUsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ3hDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyx3QkFBZSxDQUNwRSxNQUFNLENBQ1AsQ0FBQztJQUNGLGVBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLG1CQUFVLENBQUMsd0JBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLGVBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEQsZUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDMUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxVQUFVLElBQUksV0FBVyxFQUFFLENBQUM7SUFDbEQsZUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDMUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0UsZUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNqRCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLGVBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLHFCQUFxQixFQUFFLENBQUMsQ0FBQztJQUVoRSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNwQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sVUFBVSxjQUFjLENBQUMsQ0FBQztJQUM1QyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsY0FBYyxLQUFLLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDdkQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLHFCQUFxQixJQUFJLFVBQVUsZUFBZSxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDO0FBQ0YsZ0ZBQWdGIn0=