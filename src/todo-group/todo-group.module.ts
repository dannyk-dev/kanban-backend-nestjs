import { Module } from '@nestjs/common';
import { TodoGroupController } from './controllers/todo-group.controller';
import { TodoGroupService } from './services/todo-group.service';
import { TodoGroup } from 'src/entities/TodoGroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoGroup])],
  controllers: [TodoGroupController],
  providers: [TodoGroupService],
})
export class TodoGroupModule {}
