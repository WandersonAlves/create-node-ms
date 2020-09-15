"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitFirstCommit = exports.gitInit = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
exports.gitInit = (serviceDir) => {
    logger_1.logger.info('Starting git...');
    child_process_1.execSync('git init', {
        stdio: 'inherit',
        cwd: serviceDir,
    });
};
exports.gitFirstCommit = (serviceDir) => {
    logger_1.logger.info('Doing first commit, yay...');
    child_process_1.execSync('git add . && git commit -m "feat: first commit :rocket:"', {
        stdio: 'inherit',
        cwd: serviceDir,
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LWFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9naXQtYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBeUM7QUFDekMsaURBQXlDO0FBRTVCLFFBQUEsT0FBTyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQzVDLGVBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQix3QkFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixLQUFLLEVBQUUsU0FBUztRQUNoQixHQUFHLEVBQUUsVUFBVTtLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtJQUNuRCxlQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUMsd0JBQVEsQ0FBQywwREFBMEQsRUFBRTtRQUNuRSxLQUFLLEVBQUUsU0FBUztRQUNoQixHQUFHLEVBQUUsVUFBVTtLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==