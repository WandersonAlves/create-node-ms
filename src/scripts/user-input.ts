import * as prompts from 'prompts';
import { GenerateNodeProjectParams } from '../utils/types';
import { CreateExpressProject, CreateNodeServerlessExpress, CreateNodeServerlessLambda } from './create-node-serverless';

export const UserInputGenerator = async () => {
  const { options, template } = await getOptionsObject();

  switch (template) {
    case 'express': {
      await CreateExpressProject(options);
      break;
    }
    case 'serverless-lambda': {
      await CreateNodeServerlessLambda(options);
      break;
    }
    case 'serverless-express': {
      await CreateNodeServerlessExpress(options);
      break;
    }
  }
};

const formatFlags = (flags: string[]) => {
  const useNpm = Boolean(flags.find(f => f === 'useNpm'));
  const verbose = Boolean(flags.find(f => f === 'verbose'));
  const noCommit = Boolean(flags.find(f => f === 'noCommit'));
  return {
    useNpm,
    verbose,
    noCommit,
  };
};

const getOptionsObject = async () => {
  const onStateEvent: prompts.PrevCaller<string, void> = state => {
    if (state.aborted) {
      process.nextTick(() => {
        console.log('\x1b[31m✖\x1b[0m User aborted');
        process.exit(0);
      });
    }
  };
  const question1: prompts.PromptObject = {
    type: 'text',
    name: 'projectName',
    message: "What's the name of the project?",
    validate: (text: string) => (text.indexOf(' ') >= 0 ? 'Project name cant have white space' : true),
    onState: onStateEvent,
  };
  const question2: prompts.PromptObject = {
    type: 'select',
    name: 'template',
    message: 'Choose a template',
    choices: [
      { title: 'express', description: 'ExpressJS project with TypeScript', value: 'express' },
      { title: 'serverless-lambda', description: 'Serverless project with TypeScript', value: 'serverless-lambda' },
      {
        title: 'serverless-express',
        description: 'Serverless project with TypeScript and ExpressJS',
        value: 'serverless-express',
      },
    ],
    onState: onStateEvent,
  };
  const question3: prompts.PromptObject = {
    type: 'text',
    name: 'projectPath',
    message: 'Where this project will be created (empty for current folder)',
    onState: onStateEvent,
  };
  const question4: prompts.PromptObject = {
    type: 'multiselect',
    name: 'flags',
    message: 'Extras',
    choices: [
      { title: 'Use NPM?', description: 'Use NPM instead of Yarn?', value: 'useNpm' },
      { title: "Don't do a first commit", value: 'noCommit' },
      { title: 'Verbose output?', description: 'Output more information while creating the project', value: 'verbose' },
    ],
    onState: onStateEvent,
  };

  const responses = await prompts([question1, question2, question3, question4]);
  const flags = formatFlags(responses.flags);
  const options: GenerateNodeProjectParams = {
    projectName: responses.projectName,
    projectPath: responses.projectPath,
    noCommit: flags.noCommit,
    verbose: flags.verbose,
    useNpm: flags.useNpm,
    addDeps: null,
    addDevDeps: null,
  };
  return { template: responses.template, options };
};
