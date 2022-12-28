export interface GenerateNodeProjectParams {
  projectPath: string;
  projectName: string;
  useNpm?: boolean;
  noCommit?: boolean;
  verbose?: boolean;
  addDeps?: string[];
  addDevDeps?: string[];
}

export interface TemplatingParams {
  TEMPLATE_FOLDER: string;
  SHARED_TEMPLATE_FOLDER?: string;
}
