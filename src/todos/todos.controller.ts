import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UUID } from 'crypto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() todoData: CreateTodoDto) {
    return this.todosService.createTodo(todoData);
  }

  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  @Patch(':id')
  updateTodo(@Param('id') todoId: UUID, @Body() updateTodoDTO: UpdateTodoDto) {
    return this.todosService.updateTodo(todoId, updateTodoDTO);
  }
}
