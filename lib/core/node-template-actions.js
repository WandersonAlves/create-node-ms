"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaths = exports.installExtraDevDeps = exports.installExtraDeps = exports.runLint = exports.installNodeDeps = exports.createNodeProject = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
exports.createNodeProject = (serviceDir, templatePath, sharedFilesPath) => {
    logger_1.logger.info('Creating service folder...', { label: 'template' });
    try {
        fs_extra_1.mkdirSync(serviceDir);
    }
    catch (e) {
        logger_1.logger.error(`Folder at path ${serviceDir} already exists. Delete it or chose another project name`);
        process.exit(1);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10ZW1wbGF0ZS1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbm9kZS10ZW1wbGF0ZS1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUN6QyxpREFBeUM7QUFDekMsK0JBQTRCO0FBQzVCLHVDQUF5RDtBQUU1QyxRQUFBLGlCQUFpQixHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLGVBQXdCLEVBQUUsRUFBRTtJQUN0RyxlQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDakUsSUFBSTtRQUNGLG9CQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLGVBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLFVBQVUsMERBQTBELENBQUMsQ0FBQztRQUNyRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0lBQ0QsZUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELG1CQUFRLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLElBQUksZUFBZSxFQUFFO1FBQ25CLGVBQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM5RCxtQkFBUSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN2QztJQUNELG9HQUFvRztJQUNwRyw4QkFBOEI7SUFDOUIsbUJBQVEsQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxFQUFFLFdBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUM5RSxtQkFBUSxDQUFDLFdBQUksQ0FB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