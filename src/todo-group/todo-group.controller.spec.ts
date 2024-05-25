import { Test, TestingModule } from '@nestjs/testing';
import { TodoGroupController } from './todo-group.controller';

describe('TodoGroupController', () => {
  let controller: TodoGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoGroupController],
    }).compile();

    controller = module.get<TodoGroupController>(TodoGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
