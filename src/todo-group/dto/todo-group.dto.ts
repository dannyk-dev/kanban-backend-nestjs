import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoGroupDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;
}

export class UpdateTodoGroupDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
