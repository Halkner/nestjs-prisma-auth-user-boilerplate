import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class SignUpDTO {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  confirmPassword: string;
}
