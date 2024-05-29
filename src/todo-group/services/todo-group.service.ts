import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID, UUID } from 'crypto';
import { TodoGroup } from 'src/entities/TodoGroup.entity';
import { TodoGroupParams, UpdateTodoGroupParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TodoGroupService {
  constructor(
    @InjectRepository(TodoGroup)
    private todoGroupRepository: Repository<TodoGroup>,
  ) {}

  getTodoGroups(): Promise<TodoGroup[]> {
    return this.todoGroupRepository.find({ relations: ['todos'] });
  }

  async createTodoGroup(todoGroupData: TodoGroupParams): Promise<TodoGroup> {
    const newTodoGroup = this.todoGroupRepository.create({
      ...todoGroupData,
      id: randomUUID(),
    });

    return await this.todoGroupRepository.save(newTodoGroup);
  }

  async updateTodoGroup(
    groupId: UUID,
    updateGroupData: UpdateTodoGroupParams,
  ): Promise<{ message: string } | void> {
    const updateResult = await this.todoGroupRepository.update(
      { id: groupId },
      { ...updateGroupData },
    );

    if (updateResult.affected === 0) {
      throw new HttpException('Todo group was not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Updated successfully' };
  }

  async deleteTodoGroup(groupId: UUID): Promise<void> {
    try {
      const deleteResult = await this.todoGroupRepository.delete({
        id: groupId,
      });

      if (deleteResult.affected === 0) {
        throw new HttpException(
          'Todo group was not found',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failure in deleting group',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
