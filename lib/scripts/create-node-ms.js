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
const TEMPLATE_FOLDER = 'template-node-ms/';
exports.CreateNodeMsCmd = ({ noCommit, projectName, useNpm, projectPath, entityName, entityPluralName, verbose, }) => __awaiter(void 0, void 0, void 0, function* () {
    const entityNameLowerCase = entityName.toLowerCase();
    const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
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
    const currentDir = cp.execSync('pwd').toString().trim();
    logger_1.logger.verbose(`CurrentDir: ${currentDir}`);
    const serviceDir = `${currentDir}/${projectName}`;
    logger_1.logger.verbose(`ServiceDir: ${serviceDir}`);
    const cpTemplatePath = path.join(rootDir, '..', '..', '..', TEMPLATE_FOLDER);
    logger_1.logger.verbose(`CPTemplateDir: ${cpTemplatePath}`);
    const cpTemplatePackageJson = path.join(cpTemplatePath, '.package.json');
    logger_1.logger.verbose(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);
    logger_1.logger.info('Creating service folder...');
    cp.execSync(`mkdir ${projectName}`);
    logger_1.logger.info('Copying files...');
    cp.execSync(`cp -r ${cpTemplatePath}. ${serviceDir}/`);
    cp.execSync(`cp -r ${cpTemplatePackageJson} ${serviceDir}/package.json`);
    logger_1.logger.info('Processing template...');
    yield templateProcessing_1.processTemplate(serviceDir, [
        ['D_entity_D', entityNameLowerCase],
        ['D_Entity_D', entityNameCapitalized],
        ['D_entities_D', entitiesNameLowerCase],
        ['D_Entities_D', entitiesNameCapitalized],
        ['D_ProjectName_D', projectName],
    ], [
        ['entity', entityNameLowerCase],
        ['Entity', entityNameCapitalized],
        ['entities', entitiesNameLowerCase],
        ['Entities', entitiesNameCapitalized],
    ], fileName => logger_1.logger.verbose(fileName, { label: 'FileRename' }));
    logger_1.logger.info('Installing depedencies...');
    cp.execSync(`cd ${serviceDir} && ${useNpm ? 'npm i' : 'yarn'}`, {
        stdio: 'inherit',
    });
    logger_1.logger.info('Running lint...');
    cp.execSync(`cd ${serviceDir} && ${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`);
    if (!noCommit) {
        logger_1.logger.info('Setup git...');
        cp.execSync(`cd ${serviceDir} && git init && git add . && git commit -m "feat: first commit :rocket:"`, {
            stdio: 'inherit',
        });
    }
    logger_1.logger.info(`Done! cd to ${serviceDir}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1ub2RlLW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3QixvQ0FBb0M7QUFDcEMsNENBQXFEO0FBQ3JELGtEQUFzRDtBQUN0RCxvRUFBOEQ7QUFFOUQsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7QUFFL0IsUUFBQSxlQUFlLEdBQUcsQ0FBTyxFQUNwQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixPQUFPLEdBU1IsRUFBRSxFQUFFO0lBQ0gsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckQsTUFBTSxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztJQUM1RyxNQUFNLHVCQUF1QixHQUFHLDRCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEUsTUFBTSxxQkFBcUIsR0FBRyw0QkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXBFLGVBQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUU1QyxlQUFNLENBQUMsT0FBTyxDQUNaLDBCQUEwQixtQkFBVSxDQUFDO1FBQ25DLFFBQVE7UUFDUixXQUFXO1FBQ1gsTUFBTTtRQUNOLFdBQVc7UUFDWCxVQUFVO1FBQ1YsZ0JBQWdCO0tBQ2pCLENBQUMsRUFBRSxDQUNMLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLGVBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxP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