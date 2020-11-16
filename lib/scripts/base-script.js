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
exports.GenerateNodeProject = ({ projectPath, projectName, TEMPLATE_FOLDER, SHARED_TEMPLATE_FOLDER, entitiesNameCapitalized, entitiesNameLowerCase, entityNameCapitalized, entityNameLowerCase, noCommit, useNpm, verbose, addDeps, addDevDeps, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.level = verbose ? 'debug' : 'info';
    logger_1.logger.verbose(logger_1.jsonString({
        TEMPLATE_FOLDER,
        SHARED_TEMPLATE_FOLDER,
        projectName,
        projectPath,
        noCommit,
        useNpm,
        verbose,
        addDeps,
        addDevDeps,
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
    const missingEnv = validations_1.environmentVerification([useNpm ? 'npm' : 'yarn', noCommit ? undefined : 'git']);
    if (missingEnv.some(e => e.cmd === 'yarn' && e.exists === false)) {
        useNpm = true;
        missingEnv.shift();
        logger_1.logger.warn('Yarn not found, using npm instead', { label: 'environmentVerification' });
    }
    if (missingEnv.length) {
        logger_1.logger.error('Fix the errors above', { label: 'environmentVerification' });
        process.exit(1);
    }
    logger_1.logger.info('🐱 Everything went well', { label: 'environmentVerification' });
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
    if (addDeps === null || addDeps === void 0 ? void 0 : addDeps.length) {
        node_template_actions_1.installExtraDeps(serviceDir, addDeps, useNpm);
    }
    if (addDevDeps === null || addDevDeps === void 0 ? void 0 : addDevDeps.length) {
        node_template_actions_1.installExtraDevDeps(serviceDir, addDevDeps, useNpm);
    }
    node_template_actions_1.runLint(serviceDir, useNpm);
    if (!noCommit) {
        git_actions_1.gitFirstCommit(serviceDir);
    }
    logger_1.logger.info(`Done! cd to ${serviceDir}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9iYXNlLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1REFBZ0U7QUFDaEUsdURBQWdFO0FBQ2hFLDJFQU15QztBQUN6Qyx1RUFBZ0Y7QUFDaEYsaURBQXlDO0FBQ3pDLCtCQUE0QjtBQUM1Qiw4Q0FBdUQ7QUFDdkQsdUNBQXNDO0FBa0J6QixRQUFBLG1CQUFtQixHQUFHLENBQU8sRUFDeEMsV0FBVyxFQUNYLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixRQUFRLEVBQ1IsTUFBTSxFQUNOLE9BQU8sRUFDUCxPQUFPLEVBQ1AsVUFBVSxHQUNnQixFQUFFLEVBQUU7SUFDOUIsZUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzFDLGVBQU0sQ0FBQyxPQUFPLENBQ1osbUJBQVUsQ0FBQztRQUNULGVBQWU7UUFDZixzQkFBc0I7UUFDdEIsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsTUFBTTtRQUNOLE9BQU87UUFDUCxPQUFPO1FBQ1AsVUFBVTtLQUNYLENBQUMsRUFDRixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FDcEIsQ0FBQztJQUNGLHFDQUFxQztJQUNyQyx5RUFBeUU7SUFDekUsTUFBTSxPQUFPLEdBQUcsV0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLGVBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLHlCQUF5QjtJQUN6QixNQUFNLFVBQVUsR0FBRyx3QkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lB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