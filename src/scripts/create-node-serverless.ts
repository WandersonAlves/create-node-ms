import { GenerateNodeProject } from './base-script';

export const CreateNodeServerlessExpress = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  verbose,
  addDeps,
  addDevDeps,
}) => {
  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-node-serverless-express',
    SHARED_TEMPLATE_FOLDER: 'shared-template-node-serverless',
    projectName,
    projectPath,
    noCommit,
    useNpm,
    verbose,
    addDeps,
    addDevDeps,
  });
};

export const CreateNodeServerlessLambda = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  verbose,
  addDeps,
  addDevDeps,
}) => {
  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-node-serverless-lambda',
    SHARED_TEMPLATE_FOLDER: 'shared-template-node-serverless',
    projectName,
    projectPath,
    noCommit,
    useNpm,
    verbose,
    addDeps,
    addDevDeps,
  });
};
