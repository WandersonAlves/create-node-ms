import { capitalizeString } from '../utils/string-utils';
import { GenerateNodeProject } from './base-script';

export const CreateNodeMsCmd = async ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  entityName,
  entityPluralName,
  verbose,
}: {
  noCommit: boolean;
  projectName: string;
  useNpm: boolean;
  projectPath: string;
  entityName: string;
  entityPluralName: string;
  verbose: boolean;
}) => {
  const entityNameLowerCase = entityName.toLowerCase();
  const entitiesNameLowerCase = entityPluralName ? entityPluralName.toLowerCase() : entityNameLowerCase + 's';
  const entitiesNameCapitalized = capitalizeString(entitiesNameLowerCase);
  const entityNameCapitalized = capitalizeString(entityNameLowerCase);

  await GenerateNodeProject({
    TEMPLATE_FOLDER: 'template-node-ms',
    projectName,
    projectPath,
    entityNameLowerCase,
    entitiesNameLowerCase,
    entitiesNameCapitalized,
    entityNameCapitalized,
    noCommit,
    useNpm,
    verbose,
  });
};
