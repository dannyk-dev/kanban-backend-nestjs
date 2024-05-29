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
  todo: string;

  @IsOptional()
  @IsDate()
  startAt: Date;

  @IsOptional()
  @IsDate()
  endAt: Date;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  todo: string;

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
