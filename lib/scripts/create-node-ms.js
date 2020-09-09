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
const git_actions_1 = require("../core/git-actions");
const node_template_actions_1 = require("../core/node-template-actions");
const logger_1 = require("../utils/logger");
const string_utils_1 = require("../utils/string-utils");
const template_processing_1 = require("../core/template-processing");
const path_1 = require("path");
const child_process_1 = require("child_process");
exports.CreateNodeMsCmd = ({ noCommit, projectName, useNpm, projectPath, entityName, entityPluralName, verbose, }) => __awaiter(void 0, void 0, void 0, function* () {
    const TEMPLATE_FOLDER = 'template-node-ms/';
    const entityNameLowerCase = entityName.toLowerCase();
    const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
    const entitiesNameCapitalized = string_utils_1.capitalizeString(entitiesNameLowerCase);
    const entityNameCapitalized = string_utils_1.capitalizeString(entityNameLowerCase);
    logger_1.logger.level = verbose ? 'debug' : 'info';
    logger_1.logger.verbose(`create-node-ms params: ${logger_1.jsonString({
        noCommit,
        projectName,
        useNpm,
        projectPath,
        entityName,
        entityPluralName,
    })}`);
    // Get the current running script dir
    // It can be "src/scripts" or "lib/scripts" (dev and npx, global context)
    const rootDir = path_1.join(__dirname);
    logger_1.logger.debug(`RootDir: ${rootDir}`);
    // Get the current folder
    const currentDir = child_process_1.execSync('pwd').toString().trim();
    logger_1.logger.debug(`CurrentDir: ${currentDir}`);
    // Maybe the user sets a --projectPath option
    // We join the currentDir with the projectPath to get the final path to output the template
    const serviceDir = path_1.join(path_1.join(currentDir, projectPath || ''), projectName);
    logger_1.logger.debug(`ServiceDir: ${serviceDir}`);
    // This is the path of the template
    // We need this to copy files and rename contents
    const templatePath = path_1.join(rootDir, '..', '..', TEMPLATE_FOLDER);
    logger_1.logger.debug(`TemplatePath: ${templatePath}`);
    // Now we have all folder references. The heavy work begins now...
    node_template_actions_1.createProject(serviceDir, templatePath);
    const fileContentRenaming = [
        ['D_entity_D', entityNameLowerCase],
        ['D_Entity_D', entityNameCapitalized],
        ['D_entities_D', entitiesNameLowerCase],
        ['D_Entities_D', entitiesNameCapitalized],
        ['D_ProjectName_D', projectName],
    ];
    const fileNameRenaming = [
        ['entity', entityNameLowerCase],
        ['Entity', entityNameCapitalized],
        ['entities', entitiesNameLowerCase],
        ['Entities', entitiesNameCapitalized],
    ];
    yield template_processing_1.processTemplate(serviceDir, fileContentRenaming, fileNameRenaming, fileName => logger_1.logger.verbose(fileName, { label: 'FileRename' }));
    node_template_actions_1.installNodeDeps(serviceDir, useNpm);
    node_template_actions_1.runLint(serviceDir, useNpm);
    if (!noCommit) {
        git_actions_1.gitInit(serviceDir);
        git_actions_1.gitFirstCommit(serviceDir);
    }
    logger_1.logger.info(`Done! cd to ${serviceDir}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9jcmVhdGUtbm9kZS1tcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBOEQ7QUFDOUQseUVBQXdGO0FBQ3hGLDRDQUFxRDtBQUNyRCx3REFBeUQ7QUFDekQscUVBQThFO0FBQzlFLCtCQUE0QjtBQUM1QixpREFBeUM7QUFFNUIsUUFBQSxlQUFlLEdBQUcsQ0FBTyxFQUNwQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixPQUFPLEdBU1IsRUFBRSxFQUFFO0lBQ0gsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7SUFDNUMsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckQsTUFBTSxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztJQUM1RyxNQUFNLHVCQUF1QixHQUFHLCtCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEUsTUFBTSxxQkFBcUIsR0FBRywrQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXBFLGVBQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUUxQyxlQUFNLENBQUMsT0FBTyxDQUNaLDBCQUEwQixtQkFBVSxDQUFDO1FBQ25DLFFBQVE7UUFDUixXQUFXO1FBQ1gsTUFBTTtRQUNOLFdBQVc7UUFDWCxVQUFVO1FBQ1YsZ0JBQWdCO0tBQ2pCLENBQUMsRUFBRSxDQUNMLENBQUM7SUFFRixxQ0FBcUM7SUFDckMseUVBQXlFO0lBQ3pFLE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxlQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwQyx5QkFBeUI7SUFDekIsTUFBTSxVQUFVLEdBQUcsd0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxlQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyw2Q0FBNkM7SUFDN0MsMkZBQTJGO0lBQzNGLE1BQU0sVUFBVSxHQUFHLFdBQUksQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRSxlQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyxtQ0FBbUM7SUFDbkMsaURBQWlEO0lBQ2pELE1BQU0sWUFBWSxHQUFHLFdBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNoRSxlQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLGtFQUFrRTtJQUNsRSxxQ0FBYSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUV4QyxNQUFNLG1CQUFtQixHQUFtQjtRQUMxQyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztRQUNuQyxDQUFDLFlBQVksRUFBRSxxQkFBcUIsQ0FBQztRQUNyQyxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQztRQUN2QyxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQztRQUN6QyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQztLQUNqQyxDQUFDO0lBRUYsTUFBTSxnQkFBZ0IsR0FBbUI7UUFDdkMsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUM7UUFDL0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUM7UUFDakMsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUM7UUFDbkMsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUM7S0FDdEMsQ0FBQztJQUVGLE1BQU0scUNBQWUsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FDbEYsZUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FDbEQsQ0FBQztJQUVGLHVDQUFlLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLCtCQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTVCLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixxQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BCLDRCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUI7SUFDRCxlQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUEsQ0FBQyJ9