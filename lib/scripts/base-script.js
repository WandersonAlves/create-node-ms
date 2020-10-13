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
exports.GenerateNodeProject = void 0;
const git_actions_1 = require("./../core/git-actions");
const node_template_actions_1 = require("./../core/node-template-actions");
const template_processing_1 = require("./../core/template-processing");
const child_process_1 = require("child_process");
const path_1 = require("path");
const logger_1 = require("./../utils/logger");
exports.GenerateNodeProject = ({ projectPath, projectName, TEMPLATE_FOLDER, entitiesNameCapitalized, entitiesNameLowerCase, entityNameCapitalized, entityNameLowerCase, noCommit, useNpm, verbose, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.level = verbose ? 'debug' : 'info';
    logger_1.logger.verbose(`create-node-ms params: ${logger_1.jsonString({
        noCommit,
        projectName,
        useNpm,
        projectPath,
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
    const sharedTemplatePath = path_1.join(rootDir, '..', '..', 'shared-template-node/');
    // Now we have all folder references. The heavy work begins now...
    node_template_actions_1.createNodeProject(serviceDir, templatePath, sharedTemplatePath);
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
    if (!noCommit) {
        git_actions_1.gitInit(serviceDir);
    }
    node_template_actions_1.installNodeDeps(serviceDir, useNpm);
    node_template_actions_1.runLint(serviceDir, useNpm);
    if (!noCommit) {
        git_actions_1.gitFirstCommit(serviceDir);
    }
    logger_1.logger.info(`Done! cd to ${serviceDir}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9iYXNlLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1REFBZ0U7QUFDaEUsMkVBQThGO0FBQzlGLHVFQUFnRjtBQUNoRixpREFBeUM7QUFDekMsK0JBQTRCO0FBQzVCLDhDQUF1RDtBQWUxQyxRQUFBLG1CQUFtQixHQUFHLENBQU8sRUFDeEMsV0FBVyxFQUNYLFdBQVcsRUFDWCxlQUFlLEVBQ2YsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixNQUFNLEVBQ04sT0FBTyxHQUNtQixFQUFFLEVBQUU7SUFDOUIsZUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRTFDLGVBQU0sQ0FBQyxPQUFPLENBQ1osMEJBQTBCLG1CQUFVLENBQUM7UUFDbkMsUUFBUTtRQUNSLFdBQVc7UUFDWCxNQUFNO1FBQ04sV0FBVztLQUNaLENBQUMsRUFBRSxDQUNMLENBQUM7SUFDRixxQ0FBcUM7SUFDckMseUVBQXlFO0lBQ3pFLE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxlQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwQyx5QkFBeUI7SUFDekIsTUFBTSxVQUFVLEdBQUcsd0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxlQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyw2Q0FBNkM7SUFDN0MsMkZBQTJGO0lBQzNGLE1BQU0sVUFBVSxHQUFHLFdBQUksQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRSxlQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyxtQ0FBbUM7SUFDbkMsaURBQWlEO0lBQ2pELE1BQU0sWUFBWSxHQUFHLFdBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNoRSxlQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sa0JBQWtCLEdBQUcsV0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFFOUUsa0VBQWtFO0lBQ2xFLHlDQUFpQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUVoRSxNQUFNLG1CQUFtQixHQUFtQjtRQUMxQyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztRQUNuQyxDQUFDLFlBQVksRUFBRSxxQkFBcUIsQ0FBQztRQUNyQyxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQztRQUN2QyxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQztRQUN6QyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQztLQUNqQyxDQUFDO0lBRUYsTUFBTSxnQkFBZ0IsR0FBbUI7UUFDdkMsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUM7UUFDL0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUM7UUFDakMsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUM7UUFDbkMsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUM7S0FDdEMsQ0FBQztJQUVGLE1BQU0scUNBQWUsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FDbEYsZUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FDbEQsQ0FBQztJQUVGLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixxQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsdUNBQWUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEMsK0JBQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLDRCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUI7SUFFRCxlQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUEsQ0FBQyJ9