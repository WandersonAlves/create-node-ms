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
const appRoot = require("app-root-path");
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
    const rootDir = path.join(appRoot.path);
    logger_1.logger.verbose(`RootDir: ${rootDir}`);
    const currentDir = cp.execSync('pwd').toString().trim();
    logger_1.logger.verbose(`CurrentDir: ${currentDir}`);
    const serviceDir = path.join(path.join(currentDir, projectPath || ''), projectName);
    logger_1.logger.verbose(`ServiceDir: ${serviceDir}`);
    const cpTemplatePath = path.join(rootDir, TEMPLATE_FOLDER);
    logger_1.logger.verbose(`CPTemplateDir: ${cpTemplatePath}`);
    const cpTemplatePackageJson = path.join(cpTemplatePath, '.package.json');
    logger_1.logger.verbose(`CPTemplatePackageJson: ${cpTemplatePackageJson}`);
    logger_1.logger.info('Creating service folder...');
    cp.execSync(`mkdir ${serviceDir}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1ub2RlLW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3QixvQ0FBb0M7QUFDcEMseUNBQXlDO0FBQ3pDLDRDQUFxRDtBQUNyRCxrREFBc0Q7QUFDdEQsb0VBQThEO0FBRTlELE1BQU0sZUFBZSxHQUFHLG1CQUFtQixDQUFDO0FBRS9CLFFBQUEsZUFBZSxHQUFHLENBQU8sRUFDcEMsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsT0FBTyxHQVNSLEVBQUUsRUFBRTtJQUNILE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JELE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFDNUcsTUFBTSx1QkFBdUIsR0FBRyw0QkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0scUJBQXFCLEdBQUcsNEJBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUVwRSxlQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFFNUMsZUFBTSxDQUFDLE9BQU8sQ0FDWiwwQkFBMEIsbUJBQVUsQ0FBQztRQUNuQyxRQUFRO1FBQ1IsV0FBVztRQUNYLE1BQU07UUFDTixXQUFXO1FBQ1gsVUFBVTtRQUNWLGdCQUFnQjtLQUNqQixDQUFDLEVBQUUsQ0FDTCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsZUFB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