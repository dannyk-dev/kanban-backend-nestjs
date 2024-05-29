import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { CreateTodoDto, UpdateTodoDto } from '../dto/todos.dto';
import { UUID } from 'crypto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('')
  async getAll() {
    try {
      return await this.todosService.getAll();
    } catch (error) {
      throw new HttpException('Error fetching todos', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':groupId')
  async create(
    @Param('groupId') groupId: UUID,
    @Body() createTodoData: CreateTodoDto,
  ) {
    try {
      return await this.todosService.create(groupId, createTodoData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failure creating todo item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/complete')
  async completeItem(@Param('id') id: UUID) {
    try {
      return await this.todosService.completeItem(id);
    } catch (error) {
      throw new HttpException('Error updating item', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: UUID, @Body() updateTodoDTO: UpdateTodoDto) {
    return await this.todosService.update(id, updateTodoDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID) {
    try {
      return await this.todosService.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failure deleting todo item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
