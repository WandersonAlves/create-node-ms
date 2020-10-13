"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLint = exports.installNodeDeps = exports.createNodeProject = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
exports.createNodeProject = (serviceDir, templatePath, sharedFilesPath) => {
    logger_1.logger.info('Creating service folder...');
    fs_extra_1.mkdirSync(serviceDir);
    logger_1.logger.info('Copying files...');
    fs_extra_1.copySync(templatePath, serviceDir);
    if (sharedFilesPath) {
        logger_1.logger.info('Copying shared files...');
        fs_extra_1.copySync(sharedFilesPath, serviceDir);
    }
    // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
    // conflict with anything else
    fs_extra_1.moveSync(path_1.join(serviceDir, '.package.json'), path_1.join(serviceDir, 'package.json'));
    fs_extra_1.moveSync(path_1.join(serviceDir, 'gitignore'), path_1.join(serviceDir, '.gitignore'));
    fs_extra_1.moveSync(path_1.join(serviceDir, 'env'), path_1.join(serviceDir, '.env'));
};
exports.installNodeDeps = (serviceDir, useNpm) => {
    logger_1.logger.info('Installing dependencies...');
    child_process_1.execSync(`${useNpm ? 'npm i' : 'yarn'}`, {
        stdio: 'inherit',
        cwd: serviceDir,
    });
    logger_1.logger.info('Setup husky...');
    child_process_1.execSync(`${useNpm ? 'npm i husky --save-dev' : 'yarn add husky -D'}`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10ZW1wbGF0ZS1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbm9kZS10ZW1wbGF0ZS1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUN6QyxpREFBeUM7QUFDekMsK0JBQTRCO0FBQzVCLHVDQUErRDtBQUVsRCxRQUFBLGlCQUFpQixHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLGVBQXdCLEVBQUUsRUFBRTtJQUN0RyxlQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsb0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixlQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEMsbUJBQVEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkMsSUFBSSxlQUFlLEVBQUU7UUFDbkIsZUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLG1CQUFRLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0Qsb0dBQW9HO0lBQ3BHLDhCQUE4QjtJQUM5QixtQkFBUSxDQUFDLFdBQUksQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLEVBQUUsV0FBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzlFLG1CQUFRLENBQUMsV0FBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsRUFBRSxXQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDeEUsbUJBQVEsQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLFdBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFFVyxRQUFBLGVBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO0lBQ3RFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMxQyx3QkFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3ZDLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEdBQUcsRUFBRSxVQUFVO0tBQ2hCLENBQUMsQ0FBQztJQUNILGVBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5Qix3QkFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtRQUNyRSxLQUFLLEVBQUUsU0FBUztRQUNoQixHQUFHLEVBQUUsVUFBVTtLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRyxDQUFDLFVBQWtCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO0lBQzlELGVBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQix3QkFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUU7UUFDM0QsS0FBSyxFQUFFLFNBQVM7UUFDaEIsR0FBRyxFQUFFLFVBQVU7S0FDaEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=