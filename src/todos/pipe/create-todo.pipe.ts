import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from 'src/utils/types';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateTodoPipePipe implements PipeTransform {
  transform(value: CreateTodoDto): Todo {
    return {
      ...value,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
    } satisfies Todo;
  }
}
