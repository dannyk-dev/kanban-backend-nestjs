import { Module } from '@nestjs/common';
import { TodoGroupController } from './todo-group.controller';
import { TodoGroupService } from './todo-group.service';

@Module({
  controllers: [TodoGroupController],
  providers: [TodoGroupService],
})
export class TodoGroupModule {}
