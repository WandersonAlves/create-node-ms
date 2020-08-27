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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVQcm9jZXNzaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlUHJvY2Vzc2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsMkJBQTBFO0FBSTFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNVLFFBQUEsZUFBZSxHQUFHLENBQzdCLFVBQWtCLEVBQ2xCLGVBQStCLEVBQy9CLFlBQTRCLEVBQzVCLEVBQTBCLEVBQzFCLEVBQUU7SUFDRixNQUFNLEtBQUssR0FBYSxNQUFNLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckIsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDNUMsZUFBVSxDQUNSLElBQUksRUFDSixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQ3hGLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxvQkFBb0IsR0FBRyxDQUFPLEdBQVcsRUFBRSxFQUFFO0lBQ2pELE1BQU0sT0FBTyxHQUFHLGdCQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLE1BQU0sR0FBRyxHQUFHLGNBQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDRixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFBLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBZ0IsRUFBRSxHQUFHLGNBQThCLEVBQUUsRUFBRTtJQUNoRixNQUFNLFdBQVcsR0FBRyxpQkFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQztJQUNsQyxLQUFLLE1BQU0sQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLElBQUksY0FBYyxFQUFFO1FBQzFELGVBQWUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUN6RjtJQUNELGtCQUFhLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQyJ9