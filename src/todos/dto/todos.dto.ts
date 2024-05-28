import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  task: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  task: string;

  @IsOptional()
  @IsBoolean()
  completed: false;

  @IsDate()
  @IsOptional()
  startAt: Date;

  @IsDate()
  @IsOptional()
  endAt: Date;
}
