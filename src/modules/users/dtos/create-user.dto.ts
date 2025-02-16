import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  password: string;
}
