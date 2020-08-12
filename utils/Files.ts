import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { logger } from "./Logger";

export const getFileList = async (dir: string) => {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFileList(res) : res;
    })
  );
  return Array.prototype.concat(...files);
};

export const renameContent = (
  filePath: string,
  ...searchReplaces: Array<[string, string]>
) => {
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  let replacedContent = fileContent;
  for (const [searchString, replaceString] of searchReplaces) {
    replacedContent = replacedContent.replace(
      new RegExp(searchString, "g"),
      replaceString
    );
  }
  writeFileSync(filePath, replacedContent, { encoding: "utf-8" });
};

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
