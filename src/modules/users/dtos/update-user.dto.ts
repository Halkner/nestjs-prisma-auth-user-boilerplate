import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDTO extends CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  confirmPassword: string;
}
