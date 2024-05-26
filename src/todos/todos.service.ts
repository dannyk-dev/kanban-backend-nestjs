import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo.entity';
import { Repository } from 'typeorm';
import { TodoGroupParams, TodoParams, UpdateTodoParams } from 'src/utils/types';
import { randomUUID, UUID } from 'crypto';
import { TodoGroup } from 'src/entities/TodoGroup.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(TodoGroup)
    private todoGroupRepository: Repository<TodoGroup>,
  ) {}

  getTodoGroups() {
    return this.todoGroupRepository.find({ relations: ['todos'] });
  }

  createTodoGroup(todoGroupData: TodoGroupParams) {
    console.log(todoGroupData);
    const newTodo = this.todoGroupRepository.create({
      ...todoGroupData,
      id: randomUUID(),
    });

    this.todoGroupRepository.save(newTodo);
  }

  async createTodo(groupId: UUID, todo: TodoParams) {
    const todoGroup = await this.todoGroupRepository.findOneBy({ id: groupId });

    if (!todoGroup) {
      throw new HttpException('Todo group not found', HttpStatus.BAD_REQUEST);
    }

    const newTodo = this.todoRepository.create({
      ...todo,
      id: randomUUID(),
      createdAt: new Date(),
      group: todoGroup,
    });

    return await this.todoRepository.save(newTodo);
  }

  async getTodosByGroup(groupId: UUID) {
    const group = await this.todoGroupRepository.findOneBy({ id: groupId });
    return this.todoRepository.findOneBy({ group });
  }

  updateTodoGroup(groupId: UUID, updateGroupData: TodoGroupParams) {
    return this.todoGroupRepository.update(
      { id: groupId },
      {
        ...updateGroupData,
      },
    );
  }

  async updateTodoItem(
    groupId: UUID,
    todoId: UUID,
    updateTodoData: UpdateTodoParams,
  ) {
    const group = await this.todoGroupRepository.findOneBy({ id: groupId });

    this.todoRepository.update(
      { group },
      {
        ...updateTodoData,
      },
    );
  }

  deleteTodoGroup(groupId: UUID) {
    return this.todoGroupRepository.delete({ id: groupId });
  }

  async deleteTodo(groupId: UUID) {
    const group = await this.todoGroupRepository.findOneBy({ id: groupId });

    this.todoRepository.delete({ group });
  }
}
