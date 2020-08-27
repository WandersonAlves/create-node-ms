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
    const rootDir = path.join(__dirname);
    logger_1.logger.verbose(`RootDir: ${rootDir}`);
    const currentDir = cp.execSync('pwd').toString().trim();
    logger_1.logger.verbose(`CurrentDir: ${currentDir}`);
    const serviceDir = path.join(path.join(currentDir, projectPath || ''), projectName);
    logger_1.logger.verbose(`ServiceDir: ${serviceDir}`);
    const cpTemplatePath = path.join(rootDir, "..", "..", TEMPLATE_FOLDER);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9jcmVhdGUtbm9kZS1tcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNkI7QUFDN0Isb0NBQW9DO0FBQ3BDLDRDQUFxRDtBQUNyRCxrREFBc0Q7QUFDdEQsb0VBQThEO0FBRTlELE1BQU0sZUFBZSxHQUFHLG1CQUFtQixDQUFDO0FBRS9CLFFBQUEsZUFBZSxHQUFHLENBQU8sRUFDcEMsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsT0FBTyxHQVNSLEVBQUUsRUFBRTtJQUNILE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JELE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFDNUcsTUFBTSx1QkFBdUIsR0FBRyw0QkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0scUJBQXFCLEdBQUcsNEJBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUVwRSxlQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFFNUMsZUFBTSxDQUFDLE9BQU8sQ0FDWiwwQkFBMEIsbUJBQVUsQ0FBQztRQUNuQyxRQUFRO1FBQ1IsV0FBVztRQUNYLE1BQU07UUFDTixXQUFXO1FBQ1gsVUFBVTtRQUNWLGdCQUFnQjtLQUNqQixDQUFDLEVBQUUsQ0FDTCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxlQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0QyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hELGVBQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BGLGVBQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkUsZUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLGVBQU0sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLHFCQUFxQixFQUFFLENBQUMsQ0FBQztJQUVsRSxlQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbkMsZUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxjQUFjLEtBQUssVUFBVSxHQUFHLENBQUMsQ0FBQztJQUN2RCxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMscUJBQXFCLElBQUksVUFBVSxlQUFlLENBQUMsQ0FBQztJQUV6RSxlQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsTUFBTSxvQ0FBZSxDQUNuQixVQUFVLEVBQ1Y7UUFDRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztRQUNuQyxDQUFDLFlBQVksRUFBRSxxQkFBcUIsQ0FBQztRQUNyQyxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQztRQUN2QyxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQztRQUN6QyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQztLQUNqQyxFQUNEO1FBQ0UsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUM7UUFDL0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUM7UUFDakMsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUM7UUFDbkMsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUM7S0FDdEMsRUFDRCxRQUFRLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQzlELENBQUM7SUFFRixlQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLFVBQVUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDOUQsS0FBSyxFQUFFLFNBQVM7S0FDakIsQ0FBQyxDQUFDO0lBRUgsZUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxVQUFVLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUVwRixJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsZUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sVUFBVSwwRUFBMEUsRUFBRTtZQUN0RyxLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7S0FDSjtJQUNELGVBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQSxDQUFDIn0=