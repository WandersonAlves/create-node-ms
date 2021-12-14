"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitFirstCommit = exports.gitInit = void 0;
const logger_1 = require("../utils/logger");
const child_process_1 = require("child_process");
exports.gitInit = (serviceDir) => {
    logger_1.logger.info('Starting git...');
    const stdout = child_process_1.execSync('git init', {
        cwd: serviceDir,
    });
    logger_1.logger.info(stdout.toString(), { label: 'git' });
};
exports.gitFirstCommit = (serviceDir) => {
    logger_1.logger.info('Doing first commit, yay!');
    try {
        const stdout = child_process_1.execSync('git add . && git commit -m "feat: first commit :rocket:"', {
            cwd: serviceDir,
        });
        logger_1.logger.info(stdout.toString(), { label: 'git' });
    }
    catch (e) {
        logger_1.logger.error('Error when trying to make a commit. Please check if you have a user.email and user.name in your git global config');
        process.exit(1);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LWFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9naXQtYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBeUM7QUFDekMsaURBQXlDO0FBRTVCLFFBQUEsT0FBTyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQzVDLGVBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQixNQUFNLE1BQU0sR0FBRyx3QkFBUSxDQUFDLFVBQVUsRUFBRTtRQUNsQyxHQUFHLEVBQUUsVUFBVTtLQUNoQixDQUFDLENBQUM7SUFDSCxlQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ25ELGVBQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN4QyxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsd0JBQVEsQ0FBQywwREFBMEQsRUFBRTtZQUNsRixHQUFHLEVBQUUsVUFBVTtTQUNoQixDQUFDLENBQUM7UUFDSCxlQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixlQUFNLENBQUMsS0FBSyxDQUNWLG1IQUFtSCxDQUNwSCxDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMsQ0FBQyJ9