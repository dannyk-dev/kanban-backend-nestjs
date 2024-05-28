import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo.entity';
import { TodoGroup } from 'src/entities/TodoGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoGroup])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
