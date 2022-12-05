import { jsonString, logger } from './logger';

export interface GenerateNodeProjectParams {
  projectPath: string;
  projectName: string;
  useNpm?: boolean;
  noCommit?: boolean;
  verbose?: boolean;
  addDeps?: string[];
  addDevDeps?: string[];
}

export class ProjectParams implements GenerateNodeProjectParams {
  readonly projectPath: string;
  readonly projectName: string;
  readonly useNpm?: boolean;
  readonly noCommit?: boolean;
  readonly verbose?: boolean;
  readonly addDeps?: string[];
  readonly addDevDeps?: string[];

  constructor(values: GenerateNodeProjectParams) {
    this.projectPath = values.projectPath;
    this.projectName = values.projectName;
    this.useNpm = values.useNpm;
    this.noCommit = values.noCommit;
    this.verbose = values.verbose;
    this.addDeps = values.addDeps;
    this.addDevDeps = values.addDeps;
    this.validate();
  }

  private validate() {
    if (!this.projectPath || !this.projectName) {
      const objects = {
        projectPath: this.projectPath || 'null',
        projectName: this.projectName || 'null',
      };
      logger.error(`ValidationException - found null values ${jsonString(objects)}`);
      process.exit(1);
    }
    logger.verbose('Project Parameters validated!', { label: 'params' });
  }
}

export interface TemplatingParams {
  TEMPLATE_FOLDER: string;
  SHARED_TEMPLATE_FOLDER?: string;
}
