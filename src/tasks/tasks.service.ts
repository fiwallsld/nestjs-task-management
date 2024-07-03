import { CreateTaskDto } from './dto/create-task.dto';
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {
            id: "1",
            title: "Task 1",
            description: "Description 1",
            status: TaskStatus.OPEN,
        },
        {
            id: "2",
            title: "Task 2",
            description: "Description 2",
            status: TaskStatus.IN_PROGRESS,
        },
        {
            id: "3",
            title: "Task 3",
            description: "Description 3",
            status: TaskStatus.DONE,
        },
    ];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);

        return { message: "Task deleted successfully" };
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }
}
