import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoGroupService } from '../services/todo-group.service';
import { CreateTodoGroupDto, UpdateTodoGroupDto } from '../dto/todo-group.dto';
import { UUID } from 'crypto';

@Controller('todo-group')
export class TodoGroupController {
  constructor(private readonly todoGroupService: TodoGroupService) {}

  @Get('')
  async show() {
    try {
      return await this.todoGroupService.getTodoGroups();
    } catch (error) {
      throw new HttpException(
        'Error retrieving todo groups',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('')
  async create(@Body() todoGroupBody: CreateTodoGroupDto) {
    try {
      return await this.todoGroupService.createTodoGroup({ ...todoGroupBody });
    } catch (error) {
      throw new HttpException(
        'Error creating todo group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':groupId')
  async update(
    @Param('groupId') groupId: UUID,
    @Body() updateGroupBody: UpdateTodoGroupDto,
  ) {
    try {
      await this.todoGroupService.updateTodoGroup(groupId, updateGroupBody);
      return { message: 'Todo group updated succesfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':groupId')
  async delete(@Param('groupId') groupId: UUID) {
    try {
      await this.todoGroupService.deleteTodoGroup(groupId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
