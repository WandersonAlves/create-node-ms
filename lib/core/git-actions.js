"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitFirstCommit = exports.gitInit = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
exports.gitInit = (serviceDir) => {
    logger_1.logger.info('Setup git...');
    child_process_1.execSync(`cd ${serviceDir} && git init`, {
        stdio: 'inherit',
    });
};
exports.gitFirstCommit = (serviceDir) => {
    logger_1.logger.info('Setup git...');
    child_process_1.execSync(`cd ${serviceDir} && git add . && git commit -m "feat: first commit :rocket:"`, {
        stdio: 'inherit',
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LWFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9naXQtYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBeUM7QUFDekMsaURBQXlDO0FBRTVCLFFBQUEsT0FBTyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQzVDLGVBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUIsd0JBQVEsQ0FBQyxNQUFNLFVBQVUsY0FBYyxFQUFFO1FBQ3ZDLEtBQUssRUFBRSxTQUFTO0tBQ2pCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ25ELGVBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUIsd0JBQVEsQ0FBQyxNQUFNLFVBQVUsOERBQThELEVBQUU7UUFDdkYsS0FBSyxFQUFFLFNBQVM7S0FDakIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=