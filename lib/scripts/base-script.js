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
const validations_1 = require("./../core/validations");
const git_actions_1 = require("./../core/git-actions");
const node_template_actions_1 = require("./../core/node-template-actions");
const template_processing_1 = require("./../core/template-processing");
const child_process_1 = require("child_process");
const path_1 = require("path");
const logger_1 = require("./../utils/logger");
exports.GenerateNodeProject = ({ projectPath, projectName, TEMPLATE_FOLDER, SHARED_TEMPLATE_FOLDER, entitiesNameCapitalized, entitiesNameLowerCase, entityNameCapitalized, entityNameLowerCase, noCommit, useNpm, verbose, }) => __awaiter(void 0, void 0, void 0, function* () {
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
    const templatePath = path_1.join(rootDir, '..', '..', './templates', TEMPLATE_FOLDER);
    logger_1.logger.debug(`TemplatePath: ${templatePath}`);
    const sharedTemplatePath = path_1.join(rootDir, '..', '..', './shared-templates', SHARED_TEMPLATE_FOLDER);
    validations_1.environmentVerification([useNpm ? 'npm' : 'yarn', 'git']);
    logger_1.logger.info('🐱 Everything went fine', { label: 'environmentVerification' });
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
    logger_1.logger.info('Processing template...', { label: 'template' });
    yield template_processing_1.processTemplate(serviceDir, fileContentRenaming, fileNameRenaming, fileName => logger_1.logger.verbose(fileName, { label: 'template' }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9iYXNlLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1REFBZ0U7QUFDaEUsdURBQWdFO0FBQ2hFLDJFQUE4RjtBQUM5Rix1RUFBZ0Y7QUFDaEYsaURBQXlDO0FBQ3pDLCtCQUE0QjtBQUM1Qiw4Q0FBdUQ7QUFnQjFDLFFBQUEsbUJBQW1CLEdBQUcsQ0FBTyxFQUN4QyxXQUFXLEVBQ1gsV0FBVyxFQUNYLGVBQWUsRUFDZixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixNQUFNLEVBQ04sT0FBTyxHQUNtQixFQUFFLEVBQUU7SUFDOUIsZUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRTFDLGVBQU0sQ0FBQyxPQUFPLENBQ1osMEJBQTBCLG1CQUFVLENBQUM7UUFDbkMsUUFBUTtRQUNSLFdBQVc7UUFDWCxNQUFNO1FBQ04sV0FBVztLQUNaLENBQUMsRUFBRSxDQUNMLENBQUM7SUFDRixxQ0FBcUM7SUFDckMseUVBQXlFO0lBQ3pFLE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxlQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwQyx5QkFBeUI7SUFDekIsTUFBTSxVQUFVLEdBQUcsd0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxlQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyw2Q0FBNkM7SUFDN0MsMkZBQTJGO0lBQzNGLE1BQU0sVUFBVSxHQUFHLFdBQUksQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRSxlQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyxtQ0FBbUM7SUFDbkMsaURBQWlEO0lBQ2pELE1BQU0sWUFBWSxHQUFHLFdBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0UsZUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUU5QyxNQUFNLGtCQUFrQixHQUFHLFdBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBRW5HLHFDQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRTFELGVBQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBRTdFLGtFQUFrRTtJQUNsRSx5Q0FBaUIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFaEUsTUFBTSxtQkFBbUIsR0FBbUI7UUFDMUMsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7UUFDbkMsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUM7UUFDckMsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLENBQUM7UUFDdkMsQ0FBQyxjQUFjLEVBQUUsdUJBQXVCLENBQUM7UUFDekMsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUM7S0FDakMsQ0FBQztJQUVGLE1BQU0sZ0JBQWdCLEdBQW1CO1FBQ3ZDLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDO1FBQy9CLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDO1FBQ2pDLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDO1FBQ25DLENBQUMsVUFBVSxFQUFFLHVCQUF1QixDQUFDO0tBQ3RDLENBQUM7SUFFRixlQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0QsTUFBTSxxQ0FBZSxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUNsRixlQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUNoRCxDQUFDO0lBRUYsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLHFCQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDckI7SUFFRCx1Q0FBZSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwQywrQkFBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU1QixJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsNEJBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM1QjtJQUVELGVBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQSxDQUFDIn0=