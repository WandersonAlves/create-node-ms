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
    const { genTemplatePath, templatePath, sharedTemplatePath } = node_template_actions_1.getPaths({
        TEMPLATE_FOLDER,
        SHARED_TEMPLATE_FOLDER,
        projectName,
        projectPath,
    });
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
    node_template_actions_1.createNodeProject(genTemplatePath, templatePath, sharedTemplatePath);
    // If user runs nse, delete cases folder
    if (TEMPLATE_FOLDER === 'template-node-serverless-express') {
        fs_extra_1.removeSync(path_1.join(genTemplatePath, 'src', 'cases'));
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
    yield template_processing_1.processTemplate(genTemplatePath, fileContentRenaming, fileNameRenaming, fileName => logger_1.logger.verbose(fileName, { label: 'template' }));
    if (!noCommit) {
        git_actions_1.gitInit(genTemplatePath);
    }
    node_template_actions_1.installNodeDeps(genTemplatePath, useNpm);
    if (addDeps === null || addDeps === void 0 ? void 0 : addDeps.length) {
        node_template_actions_1.installExtraDeps(genTemplatePath, addDeps, useNpm);
    }
    if (addDevDeps === null || addDevDeps === void 0 ? void 0 : addDevDeps.length) {
        node_template_actions_1.installExtraDevDeps(genTemplatePath, addDevDeps, useNpm);
    }
    node_template_actions_1.runLint(genTemplatePath, useNpm);
    if (!noCommit) {
        git_actions_1.gitFirstCommit(genTemplatePath);
    }
    logger_1.logger.info(`Done! cd to ${genTemplatePath}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9iYXNlLXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1REFBZ0U7QUFDaEUsdURBQWdFO0FBQ2hFLDJFQU95QztBQUN6Qyx1RUFBZ0Y7QUFFaEYsK0JBQTRCO0FBQzVCLDhDQUF1RDtBQUN2RCx1Q0FBc0M7QUFrQnpCLFFBQUEsbUJBQW1CLEdBQUcsQ0FBTyxFQUN4QyxXQUFXLEVBQ1gsV0FBVyxFQUNYLGVBQWUsRUFDZixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixNQUFNLEVBQ04sT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEdBQ2dCLEVBQUUsRUFBRTtJQUM5QixlQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDMUMsZUFBTSxDQUFDLE9BQU8sQ0FDWixtQkFBVSxDQUFDO1FBQ1QsZUFBZTtRQUNmLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsV0FBVztRQUNYLFFBQVE7UUFDUixNQUFNO1FBQ04sT0FBTztRQUNQLE9BQU87UUFDUCxVQUFVO0tBQ1gsQ0FBQyxFQUNGLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUNwQixDQUFDO0lBQ0YscUNBQXFDO0lBQ3JDLHlFQUF5RTtJQUN6RSxNQUFNLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxHQUFHLGdDQUFRLENBQUM7UUFDckUsZUFBZTtRQUNmLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsV0FBVztLQUNaLENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHLHFDQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1B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