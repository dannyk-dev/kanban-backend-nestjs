import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { UUID } from 'crypto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoGroupDto } from './dto/CreateTodoGroup.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoGroupDTO } from './dto/UpdateTodoGroup.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  createTodoGroup(@Body() todoData: CreateTodoGroupDto) {
    return this.todosService.createTodoGroup(todoData);
  }

  @Post(':groupId')
  createTodo(
    @Param('groupId') groupId: UUID,
    @Body() createTodoBody: CreateTodoDto,
  ) {
    return this.todosService.createTodo(groupId, createTodoBody);
  }

  @Get()
  getTodos() {
    return this.todosService.getTodoGroups();
  }

  @Get(':groupId')
  getTodoItems(@Param('groupId') groupId: UUID) {
    return this.todosService.getTodosByGroup(groupId);
  }

  @Patch(':groupId')
  updateTodoGroup(
    @Param('groupId') groupId: UUID,
    @Body() updateGroupData: UpdateTodoGroupDTO,
  ) {
    return this.todosService.updateTodoGroup(groupId, updateGroupData);
  }

  @Patch(':groupId/:todoId')
  updateTodo(
    @Param('groupId') groupId: UUID,
    @Param('todoId') todoId: UUID,
    updateTodoData: UpdateTodoDto,
  ) {
    return this.todosService.updateTodoItem(groupId, todoId, updateTodoData);
  }

  // @Delete(':id')
  // deleteTodoGroup(@Param('id') todoId: UUID) {}
}
