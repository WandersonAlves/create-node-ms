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
exports.processTemplate = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
/**
 * Given a directory path, process that path as a template and rename file names
 * and content
 *
 * @example
 * ```typescript
 * await processTemplate(
    serviceDir,
    [
      ["entity", entityNameLowerCase],
      ["Entity", entityNameCapitalized],
      ["entities", entitiesNameLowerCase],
      ["Entities", entitiesNameCapitalized],
    ],
    [
      ["entity", entityNameLowerCase],
      ["Entity", entityNameCapitalized],
      ["entities", entitiesNameLowerCase],
      ["Entities", entitiesNameCapitalized],
    ]
  );
  ```
 *
 * @param serviceDir Path to operate
 * @param contentRenaming array that contains arrays of strings. The first position is the search string
 * the second position is the replace string
 * @param fileRenaming array that contains arrays of strings. The first position is the search string
 * the second position is the replace string
 * @param cb A function that receives the current fileName been operated
 */
exports.processTemplate = (serviceDir, contentRenaming, fileRenaming, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield recursiveGetFileList(serviceDir);
    for (const file of files) {
        cb ? cb(file) : null;
        renameFileContent(file, ...contentRenaming);
        fs_1.renameSync(file, fileRenaming.reduce((prev, acc) => prev.replace(new RegExp(acc[0], "g"), acc[1]), file));
    }
});
const recursiveGetFileList = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const dirents = fs_1.readdirSync(dir, { withFileTypes: true });
    const files = yield Promise.all(dirents.map((dirent) => {
        const res = path_1.resolve(dir, dirent.name);
        return dirent.isDirectory() ? recursiveGetFileList(res) : res;
    }));
    return Array.prototype.concat(...files);
});
const renameFileContent = (filePath, ...searchReplaces) => {
    const fileContent = fs_1.readFileSync(filePath, { encoding: "utf-8" });
    let replacedContent = fileContent;
    for (const [searchString, replaceString] of searchReplaces) {
        replacedContent = replacedContent.replace(new RegExp(searchString, "g"), replaceString);
    }
    fs_1.writeFileSync(filePath, replacedContent, { encoding: "utf-8" });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVQcm9jZXNzaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvdGVtcGxhdGVQcm9jZXNzaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQiwyQkFBMEU7QUFJMUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ1UsUUFBQSxlQUFlLEdBQUcsQ0FDN0IsVUFBa0IsRUFDbEIsZUFBK0IsRUFDL0IsWUFBNEIsRUFDNUIsRUFBMEIsRUFDMUIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFhLE1BQU0sb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7UUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyQixpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUM1QyxlQUFVLENBQ1IsSUFBSSxFQUNKLFlBQVksQ0FBQyxNQUFNLENBQ2pCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVELElBQUksQ0FDTCxDQUNGLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxvQkFBb0IsR0FBRyxDQUFPLEdBQVcsRUFBRSxFQUFFO0lBQ2pELE1BQU0sT0FBTyxHQUFHLGdCQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDckIsTUFBTSxHQUFHLEdBQUcsY0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDaEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNGLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUEsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEdBQUcsY0FBOEIsRUFBRSxFQUFFO0lBQ2hGLE1BQU0sV0FBVyxHQUFHLGlCQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEUsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLEtBQUssTUFBTSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsSUFBSSxjQUFjLEVBQUU7UUFDMUQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQ3ZDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsRUFDN0IsYUFBYSxDQUNkLENBQUM7S0FDSDtJQUNELGtCQUFhLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQyJ9