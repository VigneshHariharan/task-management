import { TaskStatus } from '../tasks.model';
export class UpdateTaskDto {
  id: string;
  status: TaskStatus;
}
