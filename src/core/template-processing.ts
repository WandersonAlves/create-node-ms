import { resolve } from 'path';
import { renameSync, readdirSync, readFileSync, writeFileSync } from 'fs';

export type RenamingParams = [string, string][];

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
export const processTemplate = async (
  serviceDir: string,
  contentRenaming: RenamingParams,
  fileRenaming?: RenamingParams,
  cb?: (str: string) => void,
) => {
  const files: string[] = await recursiveGetFileList(serviceDir);
  for (const file of files) {
    cb ? cb(file) : null;
    renameFileContent(file, ...contentRenaming);
    if (fileRenaming) {
      renameSync(
        file,
        fileRenaming.reduce((prev, acc) => prev.replace(new RegExp(acc[0], 'g'), acc[1]), file),
      );
    }
  }
};

const recursiveGetFileList = async (dir: string) => {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? recursiveGetFileList(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
};

const renameFileContent = (filePath: string, ...searchReplaces: RenamingParams) => {
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' });
  let replacedContent = fileContent;
  for (const [searchString, replaceString] of searchReplaces) {
    replacedContent = replacedContent.replace(new RegExp(searchString, 'g'), replaceString);
  }
  writeFileSync(filePath, replacedContent, { encoding: 'utf-8' });
};
