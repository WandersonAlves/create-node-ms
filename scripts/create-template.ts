import * as path from "path";
import * as cp from "child_process";

export const CreateTemplateCmd = ({ noCommit, projectName, useNpm }) => {
  console.log({ noCommit, projectName, useNpm });
  const rootDir = path.join(__filename);
  const currentDir = cp.execSync("pwd").toString().trim();
  const fullServicePath = `${currentDir}/${projectName}`;

  cp.execSync(`mkdir ${projectName}`);
  cp.execSync(`cd ${fullServicePath} && git init`);
  cp.execSync(
    `cp -r ${path.join(rootDir, "..", "..")}/template/. ${fullServicePath}/`
  );
  cp.execSync(
    `cp -r ${path.join(
      rootDir,
      "..",
      ".."
    )}/template/.package.json ${fullServicePath}/package.json`
  );
};
// childProcess.execSync(`cd ${fullServicePath} && yarn`, { stdio: "inherit" });
