import { IsNotEmpty } from 'class-validator';

export class CreateTodoGroupDto {
  @IsNotEmpty()
  title: string;

  description: string;
}
