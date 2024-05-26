import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo.entity';
import { TodoGroup } from 'src/entities/TodoGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoGroup])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
