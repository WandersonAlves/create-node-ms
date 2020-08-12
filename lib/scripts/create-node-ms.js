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
const Logger_1 = require("../utils/Logger");
const Params_1 = require("../utils/Params");
const Files_1 = require("../utils/Files");
const fs_1 = require("fs");
const TEMPLATE_FOLDER = "template-node-ms/";
exports.CreateNodeMsCmd = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { noCommit, projectName, useNpm, projectPath, entityName, entityPluralName } = Params_1.getScriptParams(params);
    const entityNameLowerCase = entityName.toLowerCase();
    const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
    const entitiesNameCapitalized = Files_1.capitalizeString(entitiesNameLowerCase);
    const entityNameCapitalized = Files_1.capitalizeString(entityNameLowerCase);
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
    cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
    cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);
    const files = yield Files_1.getFileList(serviceDir);
    for (const file of files) {
        Logger_1.logger.debug(file, { label: "FileRename" });
        Files_1.renameContent(file, ["entity", entityNameLowerCase], ["Entity", entityNameCapitalized], ["entities", entitiesNameLowerCase], ["Entities", entitiesNameCapitalized]);
        if (file.includes("entity") ||
            file.includes("Entity") ||
            file.includes("Entities")) {
            fs_1.renameSync(file, file
                .replace("entity", entitiesNameLowerCase)
                .replace("Entity", entityNameCapitalized)
                .replace("Entities", entitiesNameCapitalized));
        }
    }
    // cp.execSync(`cd ${serviceDir} && ${useNpm ? "npm i" : "yarn"}`, {
    //   stdio: "inherit",
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1ub2RlLW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3QixvQ0FBb0M7QUFDcEMsNENBQXFEO0FBQ3JELDRDQUFrRDtBQUNsRCwwQ0FBOEU7QUFDOUUsMkJBQWdDO0FBQ2hDLE1BQU0sZUFBZSxHQUFHLG1CQUFtQixDQUFDO0FBRS9CLFFBQUEsZUFBZSxHQUFHLENBQU8sTUFBTSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyx3QkFBZSxDQUNsRyxNQUFNLENBQ1AsQ0FBQztJQUNGLE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JELE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFDNUcsTUFBTSx1QkFBdUIsR0FBRyx3QkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0scUJBQXFCLEdBQUcsd0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUVwRSxlQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixtQkFBVSxDQUFDLHdCQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxlQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hELGVBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsVUFBVSxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ2xELGVBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzdFLGVBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDakQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN6RSxlQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixxQkFBcUIsRUFBRSxDQUFDLENBQUM7SUFFaEUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLGNBQWMsS0FBSyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxxQkFBcUIsSUFBSSxVQUFVLGVBQWUsQ0FBQyxDQUFDO0lBRXpFLE1BQU0sS0FBSyxHQUFhLE1BQU0sbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0RCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtRQUN4QixlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLHFCQUFhLENBQ1gsSUFBSSxFQUNKLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLEVBQy9CLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLEVBQ2pDLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLEVBQ25DLENBQUMsVUFBVSxFQUFFLHVCQUF1QixDQUFDLENBQ3RDLENBQUM7UUFDRixJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQ3pCO1lBQ0EsZUFBVSxDQUNSLElBQUksRUFDSixJQUFJO2lCQUNELE9BQU8sQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUM7aUJBQ3hDLE9BQU8sQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUM7aUJBQ3hDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUMsQ0FDaEQsQ0FBQztTQUNIO0tBQ0Y7SUFDRCxvRUFBb0U7SUFDcEUsc0JBQXNCO0lBQ3RCLE1BQU07QUFDUixDQUFDLENBQUEsQ0FBQyJ9