import { IsBoolean, IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class CreateTodoDto {
  @IsNotEmpty()
  todo: string;

  @IsBoolean()
  completed: boolean;

  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}
