"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaths = exports.installExtraDevDeps = exports.installExtraDeps = exports.runLint = exports.installNodeDeps = exports.createNodeProject = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
exports.createNodeProject = (serviceDir, templatePath, sharedFilesPath) => {
    logger_1.logger.info('Creating service folder...', { label: 'template' });
    fs_extra_1.mkdirSync(serviceDir);
    logger_1.logger.info('Copying files...', { label: 'template' });
    fs_extra_1.copySync(templatePath, serviceDir);
    if (sharedFilesPath) {
        logger_1.logger.info('Copying shared files...', { label: 'template' });
        fs_extra_1.copySync(sharedFilesPath, serviceDir);
    }
    // Node has problems when handling the package.json file, so we renamed it to ".package.json" to not
    // conflict with anything else
    fs_extra_1.moveSync(path_1.join(serviceDir, '.package.json'), path_1.join(serviceDir, 'package.json'));
    fs_extra_1.moveSync(path_1.join(serviceDir, 'gitignore'), path_1.join(serviceDir, '.gitignore'));
    fs_extra_1.moveSync(path_1.join(serviceDir, 'env'), path_1.join(serviceDir, '.env'));
};
exports.installNodeDeps = (serviceDir, useNpm) => {
    logger_1.logger.info('Installing dependencies...', { label: 'install' });
    child_process_1.execSync(`${useNpm ? 'npm i' : 'yarn'}`, {
        stdio: 'inherit',
        cwd: serviceDir,
    });
};
exports.runLint = (serviceDir, useNpm) => {
    logger_1.logger.info('Running lint...', { label: 'install' });
    child_process_1.execSync(`${useNpm ? 'npm run lint:fix' : 'yarn lint:fix'}`, {
        cwd: serviceDir,
        stdio: 'inherit',
    });
};
exports.installExtraDeps = (serviceDir, packages, useNpm) => {
    logger_1.logger.info('Installing extra depedencies...', { label: 'install' });
    child_process_1.execSync(`${useNpm ? 'npm i' : 'yarn add'} ${packages.join(' ')}`, { stdio: 'inherit', cwd: serviceDir });
};
exports.installExtraDevDeps = (serviceDir, packages, useNpm) => {
    logger_1.logger.info('Installing extra dev depedencies...', { label: 'install' });
    child_process_1.execSync(`${useNpm ? 'npm i' : 'yarn add'} ${packages.join(' ')} ${useNpm ? '--save-dev' : '-D'}`, {
        stdio: 'inherit',
        cwd: serviceDir,
    });
};
exports.getPaths = ({ projectPath, projectName, SHARED_TEMPLATE_FOLDER, TEMPLATE_FOLDER }) => {
    const rootPath = path_1.join(__dirname);
    logger_1.logger.debug(`RootPath: ${rootPath}`);
    // Get the current folder
    const currentPath = process.env.PWD;
    logger_1.logger.debug(`CurrentPath: ${currentPath}`);
    // Maybe the user sets a --projectPath option
    // We join the currentDir with the projectPath to get the final path to output the template
    const genTemplatePath = path_1.join(path_1.join(currentPath, projectPath || ''), projectName);
    logger_1.logger.debug(`ServiceDir: ${genTemplatePath}`);
    // This is the path of the template
    // We need this to copy files and rename contents
    const templatePath = path_1.join(rootPath, '..', '..', './templates', TEMPLATE_FOLDER);
    logger_1.logger.debug(`TemplatePath: ${templatePath}`);
    const sharedTemplatePath = path_1.join(rootPath, '..', '..', './shared-templates', SHARED_TEMPLATE_FOLDER);
    logger_1.logger.debug(`SharedTemplatePath: ${sharedTemplatePath}`);
    return { genTemplatePath, templatePath, sharedTemplatePath };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10ZW1wbGF0ZS1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbm9kZS10ZW1wbGF0ZS1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUN6QyxpREFBeUM7QUFDekMsK0JBQTRCO0FBQzVCLHVDQUF5RDtBQUU1QyxRQUFBLGlCQUFpQixHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLGVBQXdCLEVBQUUsRUFBRTtJQUN0RyxlQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDakUsb0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixlQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDdkQsbUJBQVEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkMsSUFBSSxlQUFlLEVBQUU7UUFDbkIsZUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzlELG1CQUFRLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0Qsb0dBQW9HO0lBQ3BHLDhCQUE4QjtJQUM5QixtQkFBUSxDQUFDLFdBQUksQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLEVBQUUsV0FBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzlFLG1CQUFRLENBQUMsV0FBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsRUFBRSxXQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDeEUsbUJBQVEsQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLFdBQUksQ0FBQyxVQUFVLEVB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