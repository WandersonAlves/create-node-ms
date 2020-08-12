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
exports.capitalizeString = exports.renameContent = exports.getFileList = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
exports.getFileList = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const dirents = fs_1.readdirSync(dir, { withFileTypes: true });
    const files = yield Promise.all(dirents.map((dirent) => {
        const res = path_1.resolve(dir, dirent.name);
        return dirent.isDirectory() ? exports.getFileList(res) : res;
    }));
    return Array.prototype.concat(...files);
});
exports.renameContent = (filePath, ...searchReplaces) => {
    const fileContent = fs_1.readFileSync(filePath, { encoding: "utf-8" });
    let replacedContent = fileContent;
    for (const [searchString, replaceString] of searchReplaces) {
        replacedContent = replacedContent.replace(new RegExp(searchString, "g"), replaceString);
    }
    fs_1.writeFileSync(filePath, replacedContent, { encoding: "utf-8" });
};
exports.capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9GaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsMkJBQThEO0FBR2pELFFBQUEsV0FBVyxHQUFHLENBQU8sR0FBVyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxPQUFPLEdBQUcsZ0JBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRCxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNyQixNQUFNLEdBQUcsR0FBRyxjQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUNILENBQUM7SUFDRixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFBLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRyxDQUMzQixRQUFnQixFQUNoQixHQUFHLGNBQXVDLEVBQzFDLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxpQkFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQztJQUNsQyxLQUFLLE1BQU0sQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLElBQUksY0FBYyxFQUFFO1FBQzFELGVBQWUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUN2QyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQzdCLGFBQWEsQ0FDZCxDQUFDO0tBQ0g7SUFDRCxrQkFBYSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDIn0=