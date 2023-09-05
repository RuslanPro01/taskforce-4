import { CategoryInterface, TagInterface } from '@project/shared/app-types';
import { City, Status } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty, IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskDescription, TaskSpaceMessages, TaskTitle } from '@project/shared/app-validation';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: TaskSpaceMessages.TASK_TITLE_EMPTY_NOT_VALID })
  @MinLength(TaskTitle.MIN_LENGTH, { message: TaskSpaceMessages.TASK_TITLE_MIN_LENGTH_NOT_VALID })
  @MaxLength(TaskTitle.MAX_LENGTH, { message: TaskSpaceMessages.TASK_TITLE_MAX_LENGTH_NOT_VALID })
  public title: string;

  @IsString()
  @IsNotEmpty({ message: TaskSpaceMessages.TASK_DESCRIPTION_EMPTY_NOT_VALID })
  @MinLength(TaskDescription.MIN_LENGTH, { message: TaskSpaceMessages.TASK_DESCRIPTION_MIN_LENGTH_NOT_VALID })
  @MaxLength(TaskDescription.MAX_LENGTH, { message: TaskSpaceMessages.TASK_DESCRIPTION_MAX_LENGTH_NOT_VALID })
  public description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  public status: Status;

  @IsString()
  public taskImage: string;

  @IsNotEmpty()
  public category: CategoryInterface;

  @IsArray()
  public tags: TagInterface[];

  @IsEnum(City)
  @IsNotEmpty()
  public city: City;

  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsISO8601()
  public dueDate: string;

  @IsNumber()
  public coast: number;
}
