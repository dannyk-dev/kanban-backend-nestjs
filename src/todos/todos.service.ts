import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo.entity';
import { Repository } from 'typeorm';
import { TodoParams, UpdateTodoParams } from 'src/utils/types';
import { randomUUID, UUID } from 'crypto';
// import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getAllTodos() {
    return this.todoRepository.find();
  }

  createTodo(todo: TodoParams) {
    const newTodo = this.todoRepository.create({
      ...todo,
      id: randomUUID(),
      createdAt: new Date(),
    });

    return this.todoRepository.save(newTodo);
  }

  updateTodo(id: UUID, updatedTodo: UpdateTodoParams) {
    return this.todoRepository.update(
      { id },
      {
        ...updatedTodo,
      },
    );
  }
}
