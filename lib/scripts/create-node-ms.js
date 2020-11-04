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
exports.CreateNodeMsCmd = void 0;
const string_utils_1 = require("../utils/string-utils");
const base_script_1 = require("./base-script");
exports.CreateNodeMsCmd = ({ noCommit, projectName, useNpm, projectPath, entityName, entityPluralName, verbose, }) => __awaiter(void 0, void 0, void 0, function* () {
    const entityNameLowerCase = entityName.toLowerCase();
    const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
    const entitiesNameCapitalized = string_utils_1.capitalizeString(entitiesNameLowerCase);
    const entityNameCapitalized = string_utils_1.capitalizeString(entityNameLowerCase);
    yield base_script_1.GenerateNodeProject({
        TEMPLATE_FOLDER: 'template-node-ms',
        SHARED_TEMPLATE_FOLDER: 'shared-template-node',
        projectName,
        projectPath,
        entityNameLowerCase,
        entitiesNameLowerCase,
        entitiesNameCapitalized,
        entityNameCapitalized,
        noCommit,
        useNpm,
        verbose,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9jcmVhdGUtbm9kZS1tcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx3REFBeUQ7QUFDekQsK0NBQW9EO0FBRXZDLFFBQUEsZUFBZSxHQUFHLENBQU8sRUFDcEMsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsT0FBTyxHQVNSLEVBQUUsRUFBRTtJQUNILE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JELE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFDNUcsTUFBTSx1QkFBdUIsR0FBRywrQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0scUJBQXFCLEdBQUcsK0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUVwRSxNQUFNLGlDQUFtQixDQUFDO1FBQ3hCLGVBQWUsRUFBRSxrQkFBa0I7UUFDbkMsc0JBQXNCLEVBQUUsc0JBQXNCO1FBQzlDLFdBQVc7UUFDWCxXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLFFBQVE7UUFDUixNQUFNO1FBQ04sT0FBTztLQUNSLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIn0=