"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateServerlessCommand = void 0;
exports.GenerateServerlessCommand = (refProgram, cmdName, desc, action) => {
    refProgram
        .command(cmdName)
        .description(desc)
        .option('--noCommit', "Don't do a first commit")
        .option('--useNpm', 'Use npm to install dependencies')
        .option('-p, --projectPath <projectPath>', 'Generated project path')
        .option('--verbose', 'Output verbose info')
        .option('-d, --addDeps <addDeps...>', 'Install extra depedencies')
        .option('-D, --addDevDeps <addDevDeps...>', 'Install extra dev depedencies')
        .requiredOption('-pn, --projectName <projectName>', 'Project name')
        .action(action);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY21kL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVhLFFBQUEseUJBQXlCLEdBQUcsQ0FBQyxVQUE2QixFQUFFLE9BQWUsRUFBRSxJQUFZLEVBQUUsTUFBVyxFQUFFLEVBQUU7SUFDckgsVUFBVTtTQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDaEIsV0FBVyxDQUFDLElBQUksQ0FBQztTQUNqQixNQUFNLENBQUMsWUFBWSxFQUFFLHlCQUF5QixDQUFDO1NBQy9DLE1BQU0sQ0FBQyxVQUFVLEVBQUUsaUNBQWlDLENBQUM7U0FDckQsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLHdCQUF3QixDQUFDO1NBQ25FLE1BQU0sQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUM7U0FDMUMsTUFBTSxDQUFDLDRCQUE0QixFQUFFLDJCQUEyQixDQUFDO1NBQ2pFLE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRSwrQkFBK0IsQ0FBQztTQUMzRSxjQUFjLENBQUMsa0NBQWtDLEVBQUUsY0FBYyxDQUFDO1NBQ2xFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==