"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLint = exports.installNodeDeps = exports.createProject = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
const path_1 = require("path");
exports.createProject = (serviceDir, templatePath) => {
    logger_1.logger.info('Creating service folder...');
    child_process_1.execSync(`mkdir ${serviceDir}`);
    logger_1.logger.info('Copying files...');
    child_process_1.execSync(`cp -r ${templatePath}. ${serviceDir}/`);
    // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
    // conflict with anything else
    child_process_1.execSync(`cp -r ${path_1.join(templatePath, '.package.json')} ${serviceDir}/package.json`);
    child_process_1.execSync(`cp -r ${path_1.join(templatePath, 'gitignore')} ${serviceDir}/.gitignore`);
};
exports.installNodeDeps = (serviceDir, useNpm) => {
    logger_1.logger.info('Installing dependencies...');
    child_process_1.execSync(`cd ${serviceDir} && ${useNpm ? 'npm i' : 'yarn'}`, {
        stdio: 'inherit',
    });
};
exports.runLint = (serviceDir, useNpm) => {
    logger_1.logger.info('Running lint...');
    child_process_1.execSync(`cd ${serviceDir} && ${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10ZW1wbGF0ZS1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbm9kZS10ZW1wbGF0ZS1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUN6QyxpREFBeUM7QUFDekMsK0JBQTRCO0FBRWYsUUFBQSxhQUFhLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUN4RSxlQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsd0JBQVEsQ0FBQyxTQUFTLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDaEMsZUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hDLHdCQUFRLENBQUMsU0FBUyxZQUFZLEtBQUssVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNsRCxvR0FBb0c7SUFDcEcsOEJBQThCO0lBQzlCLHdCQUFRLENBQUMsU0FBUyxXQUFJLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxJQUFJLFVBQVUsZUFBZSxDQUFDLENBQUM7SUFDcEYsd0JBQVEsQ0FBQyxTQUFTLFdBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLElBQUksVUFBVSxhQUFhLENBQUMsQ0FBQztBQUNoRixDQUFDLENBQUM7QUFFVyxRQUFBLGVBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO0lBQ3RFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMxQyx3QkFBUSxDQUFDLE1BQU0sVUFBVSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUMzRCxLQUFLLEVBQUUsU0FBUztLQUNqQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRyxDQUFDLFVBQWtCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO0lBQzlELGVBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQix3QkFBUSxDQUFDLE1BQU0sVUFBVSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFDIn0=