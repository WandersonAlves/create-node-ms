const path = require("path");
const childProcess = require("child_process");

const rootDir = path.join(__filename);
const currentDir = childProcess.execSync("pwd").toString().trim();
// TODO Use commander
const serviceName = "payment-service";
const fullServicePath = `${currentDir}/${serviceName}`;

childProcess.execSync(`mkdir ${serviceName}`);
childProcess.execSync(`cd ${fullServicePath} && git init`);
childProcess.execSync(
  `cp -r ${path.join(rootDir, "..", "..")}/template/. ${fullServicePath}/`
);
// childProcess.execSync(`cd ${fullServicePath} && yarn`, { stdio: "inherit" });
