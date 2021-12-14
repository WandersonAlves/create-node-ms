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
        fs_1.renameSync(file, fileRenaming.reduce((prev, acc) => prev.replace(new RegExp(acc[0], 'g'), acc[1]), file));
    }
});
const recursiveGetFileList = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const dirents = fs_1.readdirSync(dir, { withFileTypes: true });
    const files = yield Promise.all(dirents.map(dirent => {
        const res = path_1.resolve(dir, dirent.name);
        return dirent.isDirectory() ? recursiveGetFileList(res) : res;
    }));
    return Array.prototype.concat(...files);
});
const renameFileContent = (filePath, ...searchReplaces) => {
    const fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    let replacedContent = fileContent;
    for (const [searchString, replaceString] of searchReplaces) {
        replacedContent = replacedContent.replace(new RegExp(searchString, 'g'), replaceString);
    }
    fs_1.writeFileSync(filePath, replacedContent, { encoding: 'utf-8' });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcHJvY2Vzc2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3RlbXBsYXRlLXByb2Nlc3NpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLDJCQUEwRTtBQUkxRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDVSxRQUFBLGVBQWUsR0FBRyxDQUM3QixVQUFrQixFQUNsQixlQUErQixFQUMvQixZQUE0QixFQUM1QixFQUEwQixFQUMxQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQWEsTUFBTSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JCLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLGVBQVUsQ0FDUixJQUFJLEVBQ0osWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUN4RixDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQUcsQ0FBTyxHQUFXLEVBQUUsRUFBRTtJQUNqRCxNQUFNLE9BQU8sR0FBRyxnQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuQixNQUFNLEdBQUcsR0FBRyxjQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNoRSxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0YsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFFBQWdCLEVBQUUsR0FBRyxjQUE4QixFQUFFLEVBQUU7SUFDaEYsTUFBTSxXQUFXLEdBQUcsaUJBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNsRSxJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUM7SUFDbEMsS0FBSyxNQUFNLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxJQUFJLGNBQWMsRUFBRTtRQUMxRCxlQUFlLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDekY7SUFDRCxrQkFBYSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMifQ==