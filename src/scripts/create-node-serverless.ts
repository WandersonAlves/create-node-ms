import { GenerateNodeProject } from './base-script';

export const CreateNodeServerless = async ({ noCommit, projectName, useNpm, projectPath, verbose }) => {
  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-node-serverless',
    projectName,
    projectPath,
    noCommit,
    useNpm,
    verbose,
  });
};
