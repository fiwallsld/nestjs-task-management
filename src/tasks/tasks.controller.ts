import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from "./task.model"
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto) {
        // if we have any logic to add, we can add it here
        // otherwise, we can just call getAllTasks()
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        }

        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.log("Bod: ", createTaskDto);

        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, status);
    }


}
