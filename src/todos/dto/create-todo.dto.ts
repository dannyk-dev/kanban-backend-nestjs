import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  todo: string;

  startAt: Date | null;

  endAt: Date | null;
}
