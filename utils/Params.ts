export const getScriptParams = ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  entityName,
  entityPluralName,
}: {
  noCommit: boolean;
  projectName: string;
  useNpm: boolean;
  projectPath: string;
  entityName: string;
  entityPluralName: string;
}) => ({
  noCommit,
  projectName,
  useNpm,
  projectPath,
  entityName,
  entityPluralName,
});
