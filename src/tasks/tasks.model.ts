export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}
