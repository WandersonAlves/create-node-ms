"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodeServerlessLambda = exports.CreateNodeServerlessExpress = void 0;
const base_script_1 = require("./base-script");
exports.CreateNodeServerlessExpress = ({ noCommit, projectName, useNpm, projectPath, verbose }) => __awaiter(void 0, void 0, void 0, function* () {
    yield base_script_1.GenerateNodeProject({
        TEMPLATE_FOLDER: 'template-node-serverless-express',
        SHARED_TEMPLATE_FOLDER: 'shared-template-node-serverless',
        projectName,
        projectPath,
        noCommit,
        useNpm,
        verbose,
    });
});
exports.CreateNodeServerlessLambda = ({ noCommit, projectName, useNpm, projectPath, verbose }) => __awaiter(void 0, void 0, void 0, function* () {
    yield base_script_1.GenerateNodeProject({
        TEMPLATE_FOLDER: 'template-node-serverless-lambda',
        SHARED_TEMPLATE_FOLDER: 'shared-template-node-serverless',
        projectName,
        projectPath,
        noCommit,
        useNpm,
        verbose,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtc2VydmVybGVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2NyZWF0ZS1ub2RlLXNlcnZlcmxlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW9EO0FBRXZDLFFBQUEsMkJBQTJCLEdBQUcsQ0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQzNHLE1BQU0saUNBQW1CLENBQUM7UUFDeEIsZUFBZSxFQUFFLGtDQUFrQztRQUNuRCxzQkFBc0IsRUFBRSxpQ0FBaUM7UUFDekQsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsTUFBTTtRQUNOLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQztBQUVXLFFBQUEsMEJBQTBCLEdBQUcsQ0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQzFHLE1BQU0saUNBQW1CLENBQUM7UUFDeEIsZUFBZSxFQUFFLGlDQUFpQztRQUNsRCxzQkFBc0IsRUFBRSxpQ0FBaUM7UUFDekQsV0FBVztRQUNYLFdBQVc7UUFDWCxRQUFRO1FBQ1IsTUFBTTtRQUNOLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyJ9