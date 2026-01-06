
export interface ChecklistStep {
  step: string;
  whatItIs: string;
  whereToStart: string;
}

export interface ChecklistResponse {
  title: string;
  steps: ChecklistStep[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
