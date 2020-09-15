"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLint = exports.installNodeDeps = exports.createProject = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
exports.createProject = (serviceDir, templatePath) => {
    logger_1.logger.info('Creating service folder...');
    fs_extra_1.mkdirSync(serviceDir);
    logger_1.logger.info('Copying files...');
    fs_extra_1.copySync(templatePath, serviceDir);
    // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
    // conflict with anything else
    fs_extra_1.moveSync(path_1.join(serviceDir, '.package.json'), path_1.join(serviceDir, 'package.json'));
    fs_extra_1.moveSync(path_1.join(serviceDir, 'gitignore'), path_1.join(serviceDir, '.gitignore'));
};
exports.installNodeDeps = (serviceDir, useNpm) => {
    logger_1.logger.info('Installing dependencies...');
    child_process_1.execSync(`${useNpm ? 'npm i' : 'yarn'}`, {
        stdio: 'inherit',
        cwd: serviceDir,
    });
};
exports.runLint = (serviceDir, useNpm) => {
    logger_1.logger.info('Running lint...');
    child_process_1.execSync(`${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`, {
        stdio: 'inherit',
        cwd: serviceDir,
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10ZW1wbGF0ZS1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbm9kZS10ZW1wbGF0ZS1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUN6QyxpREFBeUM7QUFDekMsK0JBQTRCO0FBQzVCLHVDQUF5RDtBQUU1QyxRQUFBLGFBQWEsR0FBRyxDQUFDLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO0lBQ3hFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMxQyxvQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLGVBQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxtQkFBUSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuQyxvR0FBb0c7SUFDcEcsOEJBQThCO0lBQzlCLG1CQUFRLENBQUMsV0FBSSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsRUFBRSxXQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsbUJBQVEsQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUFFLFdBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFFVyxRQUFBLGVBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO0lBQ3RFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMxQyx3QkFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3ZDLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEdBQUcsRUFBRSxVQUFVO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLENBQUMsVUFBa0IsRUFBRSxNQUFnQixFQUFFLEVBQUU7SUFDOUQsZUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLHdCQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtRQUMzRCxLQUFLLEVBQUUsU0FBUztRQUNoQixHQUFHLEVBQUUsVUFBVTtLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==