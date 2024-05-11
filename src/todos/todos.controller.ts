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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoPipePipe } from './pipe/create-todo.pipe';
import { UUID } from 'crypto';
// import { Todo } from 'src/utils/types';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body(CreateTodoPipePipe) todoData: CreateTodoDto) {
    return this.todosService.create(todoData);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.todosService.remove(id);
  }
}
