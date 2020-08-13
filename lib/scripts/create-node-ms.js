"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodeMsCmd = void 0;
const path = require("path");
const cp = require("child_process");
const logger_1 = require("../utils/logger");
const miscUtils_1 = require("../utils/miscUtils");
const templateProcessing_1 = require("../utils/templateProcessing");
const TEMPLATE_FOLDER = "template-node-ms/";
exports.CreateNodeMsCmd = ({ noCommit, projectName, useNpm, projectPath, entityName, entityPluralName, verbose }) => __awaiter(void 0, void 0, void 0, function* () {
    const entityNameLowerCase = entityName.toLowerCase();
    const entitiesNameLowerCase = entityPluralName
        ? entityPluralName.toLowerCase()
        : entityNameLowerCase + "s";
    const entitiesNameCapitalized = miscUtils_1.capitalizeString(entitiesNameLowerCase);
    const entityNameCapitalized = miscUtils_1.capitalizeString(entityNameLowerCase);
    logger_1.logger.level = verbose ? 'verbose' : 'info';
    logger_1.logger.verbose(`create-node-ms params: ${logger_1.jsonString({
        noCommit,
        projectName,
        useNpm,
        projectPath,
        entityName,
        entityPluralName,
    })}`);
    const rootDir = path.join(__filename);
    logger_1.logger.verbose(`RootDir: ${rootDir}`);
    const currentDir = cp.execSync("pwd").toString().trim();
    logger_1.logger.verbose(`CurrentDir: ${currentDir}`);
    const serviceDir = `${currentDir}/${projectName}`;
    logger_1.logger.verbose(`ServiceDir: ${serviceDir}`);
    const cpTemplatePath = path.join(rootDir, "..", "..", "..", TEMPLATE_FOLDER);
    logger_1.logger.verbose(`CPTemplateDir: ${cpTemplatePath}`);
    const cpTemplatePackageJson = path.join(cpTemplatePath, ".package.json");
    logger_1.logger.verbose(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);
    logger_1.logger.info('Creating service folder...');
    cp.execSync(`mkdir ${projectName}`);
    logger_1.logger.info('Copying files...');
    cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
    cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);
    logger_1.logger.info('Processing template...');
    yield templateProcessing_1.processTemplate(serviceDir, [
        ["D_entity_D", entityNameLowerCase],
        ["D_Entity_D", entityNameCapitalized],
        ["D_entities_D", entitiesNameLowerCase],
        ["D_Entities_D", entitiesNameCapitalized],
    ], [
        ["entity", entityNameLowerCase],
        ["Entity", entityNameCapitalized],
        ["entities", entitiesNameLowerCase],
        ["Entities", entitiesNameCapitalized],
    ], (fileName) => logger_1.logger.verbose(fileName, { label: "FileRename" }));
    logger_1.logger.info('Installing depedencies...');
    cp.execSync(`cd ${serviceDir} && ${useNpm ? "npm i" : "yarn"}`, {
        stdio: "inherit",
    });
    logger_1.logger.info("Running lint...");
    cp.execSync(`cd ${serviceDir} && ${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`);
    if (!noCommit) {
        logger_1.logger.info("Setup git...");
        cp.execSync(`cd ${serviceDir} && git init && git add . && git commit -m "feat: first commit :rocket:"`, {
            stdio: "inherit",
        });
    }
    logger_1.logger.info(`Done! cd to ${serviceDir}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1ub2RlLW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3QixvQ0FBb0M7QUFDcEMsNENBQXFEO0FBQ3JELGtEQUFzRDtBQUN0RCxvRUFBOEQ7QUFFOUQsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7QUFFL0IsUUFBQSxlQUFlLEdBQUcsQ0FBTyxFQUNwQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixPQUFPLEVBU1IsRUFBRSxFQUFFO0lBQ0gsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckQsTUFBTSxxQkFBcUIsR0FBRyxnQkFBZ0I7UUFDNUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtRQUNoQyxDQUFDLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO0lBQzlCLE1BQU0sdUJBQXVCLEdBQUcsNEJBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN4RSxNQUFNLHFCQUFxQixHQUFHLDRCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFcEUsZUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBRTNDLGVBQU0sQ0FBQyxPQUFPLENBQ1osMEJBQTBCLG1CQUFVLENBQUM7UUFDbkMsUUFBUTtRQUNSLFdBQVc7UUFDWCxNQUFNO1FBQ04sV0FBVztRQUNYLFVBQVU7UUFDVixnQkFBZ0I7S0FDakIsQ0FBQyxFQUFFLENBQ0wsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZ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