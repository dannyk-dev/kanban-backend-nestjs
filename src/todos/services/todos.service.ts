import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID, UUID } from 'crypto';
import { Todo } from 'src/entities/Todo.entity';
import { TodoGroup } from 'src/entities/TodoGroup.entity';
import { TodoParams, UpdateTodoParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(TodoGroup)
    private todoGroupRepository: Repository<TodoGroup>,
  ) {}

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(groupId: UUID, todoDetails: TodoParams): Promise<Todo> {
    const group = await this.todoGroupRepository.findOneBy({ id: groupId });

    if (!group) {
      throw new HttpException(
        'This group does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTodo = this.todoRepository.create({
      ...todoDetails,
      id: randomUUID(),
      createdAt: new Date(),
      group,
    });

    return await this.todoRepository.save(newTodo);
  }

  async completeItem(id: UUID) {
    const todoItem = await this.todoRepository.findOneBy({ id });

    if (!todoItem) {
      throw new HttpException(
        'Todo Item to update not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedItem = await this.todoRepository.update(
      { id },
      {
        completed: !todoItem.completed,
      },
    );

    if (updatedItem.affected === 0) {
      throw new HttpException('Todo item was not found', HttpStatus.NOT_FOUND);
    }

    console.log(updatedItem);
    return updatedItem;
  }

  async update(id: UUID, updateTodoParams: UpdateTodoParams) {
    return await this.todoRepository.update({ id }, { ...updateTodoParams });
  }

  async delete(id: UUID) {
    const deleteRes = await this.todoRepository.delete({ id });

    if (deleteRes.affected === 0) {
      throw new HttpException('Todo item was not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Deleted succesfully',
    };
  }
}
