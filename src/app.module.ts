import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/Todo.entity';
import { TodoGroupModule } from './todo-group/todo-group.module';
import { TodoGroupService } from './todo-group/todo-group.service';
import { TodoGroup } from './entities/TodoGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dankai1973',
      database: 'todo_list',
      entities: [Todo, TodoGroup],
      synchronize: true,
    }),
    TodosModule,
    TodoGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, TodoGroupService],
})
export class AppModule {}
