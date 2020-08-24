import { TaskStatus } from '../tasks.model';

export class FilterTaskDto {
  status: TaskStatus;
  search: string;
}
