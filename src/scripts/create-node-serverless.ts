import { logger } from '../utils/logger';
import { GenerateNodeProjectParams, ProjectParams } from '../utils/types';
import { GenerateNodeProject } from './base-script';

export const CreateExpressProject = async (params: GenerateNodeProjectParams) => {
  _GenerateProject(params, 'template-express');
};

export const CreateNodeServerlessExpress = async (params: GenerateNodeProjectParams) => {
  _GenerateProject(params, 'template-serverless-express');
};

export const CreateNodeServerlessLambda = async (params: GenerateNodeProjectParams) => {
  _GenerateProject(params, 'template-serverless-lambda');
};

const _GenerateProject = async (params: GenerateNodeProjectParams, templateFolder: string) => {
  logger.level = params.verbose ? 'debug' : 'info';
  const { noCommit, projectName, useNpm, projectPath, verbose, addDeps, addDevDeps } = new ProjectParams(params);
  await GenerateNodeProject({
    TEMPLATE_FOLDER: templateFolder,
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
