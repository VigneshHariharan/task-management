import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(filterTasksDto: FilterTaskDto): Task[] {
    let tasks = [...this.tasks];
    if (filterTasksDto.status) {
      tasks = tasks.filter(task => {
        return Number(task.status) === Number(filterTasksDto.status);
      });
    }
    if (filterTasksDto.search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(filterTasksDto.search) ||
          task.description.includes(filterTasksDto.search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => {
      return task.id === id;
    });

    return task;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): boolean {
    let isTaskAvailable = false;
    const filteredTasks = this.tasks.filter(task => {
      if (task.id === id) {
        isTaskAvailable = true;
        return false;
      }
      return true;
    });
    this.tasks = [...filteredTasks];
    return isTaskAvailable;
  }

  updateTaskStatus({ id, status }: UpdateTaskDto): Task | string {
    // update the status of the task with the corresponding id
    // update the updated task in the task array
    // return the updated task

    let updatedTask;
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        updatedTask = { ...task, status };
        return updatedTask;
      }
      return task;
    });
    return updatedTask !== undefined ? updatedTask : 'task not available';
  }
}
