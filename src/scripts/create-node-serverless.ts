import { GenerateNodeProjectParams } from '../utils/types';
import { GenerateNodeProject } from './base-script';

export const CreateExpressProject = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  verbose,
  addDeps,
  addDevDeps,
}: GenerateNodeProjectParams) => {
  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-express',
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

export const CreateNodeServerlessExpress = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  verbose,
  addDeps,
  addDevDeps,
}: GenerateNodeProjectParams) => {
  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-serverless-express',
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
}: GenerateNodeProjectParams) => {
  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-serverless-lambda',
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
