import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { Todo } from 'src/utils/types';
// import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: randomUUID(),
      todo: 'Go to Gym',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      todo: 'Eat Food',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(todoData: Todo) {
    this.todos.push(todoData);

    return {
      message: 'Created Successfully',
      status: HttpStatus.CREATED,
    };
  }

  findAll() {
    return this.todos;
  }

  findOne(id: UUID) {
    const [todo] = this.todos.filter((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.BAD_REQUEST);
    }

    return todo;
  }

  update(id: UUID, updateTodoData: Partial<Todo>) {
    const updatedTodos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          ...updateTodoData,
        };
      }
    });

    this.todos = updatedTodos;
    return updatedTodos;
  }

  remove(id: UUID) {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = updatedTodos;

    return this.todos;
  }
}
