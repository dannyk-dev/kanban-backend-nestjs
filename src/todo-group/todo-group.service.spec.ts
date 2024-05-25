import { Test, TestingModule } from '@nestjs/testing';
import { TodoGroupService } from './todo-group.service';

describe('TodoGroupService', () => {
  let service: TodoGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoGroupService],
    }).compile();

    service = module.get<TodoGroupService>(TodoGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
