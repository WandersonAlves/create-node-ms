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
exports.CreateNodeServerless = void 0;
const base_script_1 = require("./base-script");
exports.CreateNodeServerless = ({ noCommit, projectName, useNpm, projectPath, verbose }) => __awaiter(void 0, void 0, void 0, function* () {
    yield base_script_1.GenerateNodeProject({
        TEMPLATE_FOLDER: 'template-node-serverless',
        projectName,
        projectPath,
        noCommit,
        useNpm,
        verbose,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtc2VydmVybGVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2NyZWF0ZS1ub2RlLXNlcnZlcmxlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW9EO0FBRXZDLFFBQUEsb0JBQW9CLEdBQUcsQ0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQ3BHLE1BQU0saUNBQW1CLENBQUM7UUFDeEIsZUFBZSxFQUFFLDBCQUEwQjtRQUMzQyxXQUFXO1FBQ1gsV0FBVztRQUNYLFFBQVE7UUFDUixNQUFNO1FBQ04sT0FBTztLQUNSLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIn0=