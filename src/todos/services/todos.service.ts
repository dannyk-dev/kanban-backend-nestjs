import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo.entity';
import { TodoGroup } from 'src/entities/TodoGroup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(TodoGroup)
    private todoGroupRepository: Repository<TodoGroup>,
  ) {}
}
