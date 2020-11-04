"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentVerification = void 0;
const logger_1 = require("./../utils/logger");
const child_process_1 = require("child_process");
/**
 * Given a list of commands, validates if they exists on the environment
 *
 * If a command don't exists, then finishes the execution of template and log
 * which commands are found or not
 *
 * @param cmmds A array of commands to be validated
 */
exports.environmentVerification = (cmmds) => {
    const label = 'environmentVerification';
    const hasCommand = (cmd) => {
        try {
            child_process_1.execSync(`which ${cmd}`);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    const validations = [
        ...cmmds
            .filter(cmd => cmd)
            .map(cmd => ({
            cmd,
            exists: hasCommand(cmd),
        })),
    ];
    const missingEnv = validations.filter(val => (val.exists ? false : true));
    validations.forEach(val => val.exists
        ? logger_1.logger.info(`✅ ${val.cmd} found!`, { label })
        : logger_1.logger.error(`⛔️ Missing ${val.cmd} command on ths environment`, { label }));
    if (missingEnv.length) {
        logger_1.logger.error('Fix the errors above');
        process.exit(1);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS92YWxpZGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBMkM7QUFDM0MsaURBQXlDO0FBRXpDOzs7Ozs7O0dBT0c7QUFDVSxRQUFBLHVCQUF1QixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7SUFDekQsTUFBTSxLQUFLLEdBQUcseUJBQXlCLENBQUM7SUFFeEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtRQUMxQyxJQUFJO1lBQ0Ysd0JBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUE0QztRQUMzRCxHQUFHLEtBQUs7YUFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLEdBQUc7WUFDSCxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDeEIsR0FBRyxDQUFDLE1BQU07UUFDUixDQUFDLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQy9DLENBQUMsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLEdBQUcsNkJBQTZCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUNoRixDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3JCLGVBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQyxDQUFDIn0=