export interface IProjectDetail {
  content: string;
  children: IProjectDetail[];
}

export interface IProject {
  name: string;
  repo: string;
  demo?: string;
  detail: IProjectDetail[];
}

export interface IProjectProps {
  project: IProject;
}
