import * as path from "path";
import * as cp from "child_process";

const TEMPLATE_FOLDER = 'template-node-ms';

export const CreateNodeMsCmd = ({ noCommit, projectName, useNpm, projectPath }) => {
  console.log({ noCommit, projectName, useNpm });
  const rootDir = path.join(__filename);
  const currentDir = cp.execSync("pwd").toString().trim();
  console.log(currentDir);
  const fullServicePath = `${currentDir}/${projectName}`;

  cp.execSync(`mkdir ${projectName}`);
  cp.execSync(`cd ${fullServicePath} && git init`);
  cp.execSync(
    `cp -r ${path.join(
      rootDir,
      "..",
      "..",
      TEMPLATE_FOLDER
    )}. ${fullServicePath}/`
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
