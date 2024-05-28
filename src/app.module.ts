import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoGroupModule } from './todo-group/todo-group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/Todo.entity';
import { TodoGroup } from './entities/TodoGroup.entity';
import { TodosModule } from './todos/todos.module';

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
  providers: [AppService],
})
export class AppModule {}
