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
const fs_extra_1 = require("fs-extra");
exports.GenerateNodeProject = ({ projectPath, projectName, TEMPLATE_FOLDER, SHARED_TEMPLATE_FOLDER, entitiesNameCapitalized, entitiesNameLowerCase, entityNameCapitalized, entityNameLowerCase, noCommit, useNpm, verbose, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.level = verbose ? 'debug' : 'info';
    logger_1.logger.verbose(logger_1.jsonString({
        TEMPLATE_FOLDER,
        SHARED_TEMPLATE_FOLDER,
        projectName,
        projectPath,
        noCommit,
        useNpm,
        verbose,
    }), { label: 'params' });
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
    logger_1.logger.debug(`SharedTemplatePath: ${sharedTemplatePath}`);
    validations_1.environmentVerification([useNpm ? 'npm' : 'yarn', noCommit ? undefined : 'git']);
    logger_1.logger.info('🐱 Everything went fine', { label: 'environmentVerification' });
    // Now we have all folder references. The heavy work begins now...
    node_template_actions_1.createNodeProject(serviceDir, templatePath, sharedTemplatePath);
    // If user runs nse, delete cases folder
    if (TEMPLATE_FOLDER === 'template-node-serverless-express') {
        fs_extra_1.removeSync(path_1.join(serviceDir, 'src', 'cases'));
    }
    const fileContentRenaming = [
        ['D_entity_D', entityNameLowerCase],
        ['D_Entity_D', entityNameCapitalized],
        ['D_entities_D', entitiesNameLowerCase],
        ['D_Entities_D', entitiesNameCapitalized],
        ['D_ProjectName_D', projectName],
        ['D_npyarn_D', useNpm ? 'npm run' : 'yarn'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9iYXNlLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1REFBZ0U7QUFDaEUsdURBQWdFO0FBQ2hFLDJFQUE4RjtBQUM5Rix1RUFBZ0Y7QUFDaEYsaURBQXlDO0FBQ3pDLCtCQUE0QjtBQUM1Qiw4Q0FBdUQ7QUFDdkQsdUNBQXNDO0FBZ0J6QixRQUFBLG1CQUFtQixHQUFHLENBQU8sRUFDeEMsV0FBVyxFQUNYLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixRQUFRLEVBQ1IsTUFBTSxFQUNOLE9BQU8sR0FDbUIsRUFBRSxFQUFFO0lBQzlCLGVBQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUUxQyxlQUFNLENBQUMsT0FBTyxDQUNaLG1CQUFVLENBQUM7UUFDVCxlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLFdBQVc7UUFDWCxXQUFXO1FBQ1gsUUFBUTtRQUNSLE1BQU07UUFDTixPQUFPO0tBQ1IsQ0FBQyxFQUNGLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUNwQixDQUFDO0lBQ0YscUNBQXFDO0lBQ3JDLHlFQUF5RTtJQUN6RSxNQUFNLE9BQU8sR0FBRyxXQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsZUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDcEMseUJBQXlCO0lBQ3pCLE1BQU0sVUFBVSxHQUFHLHdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckQsZUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLFVBQVUsRUFBRSxD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