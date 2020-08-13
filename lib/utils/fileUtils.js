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
exports.renameContent = exports.getFileList = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvZmlsZVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQiwyQkFBOEQ7QUFFakQsUUFBQSxXQUFXLEdBQUcsQ0FBTyxHQUFXLEVBQUUsRUFBRTtJQUMvQyxNQUFNLE9BQU8sR0FBRyxnQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLGNBQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNGLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUEsQ0FBQztBQUVXLFFBQUEsYUFBYSxHQUFHLENBQzNCLFFBQWdCLEVBQ2hCLEdBQUcsY0FBdUMsRUFDMUMsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLGlCQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEUsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLEtBQUssTUFBTSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsSUFBSSxjQUFjLEVBQUU7UUFDMUQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQ3ZDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsRUFDN0IsYUFBYSxDQUNkLENBQUM7S0FDSDtJQUNELGtCQUFhLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQyJ9