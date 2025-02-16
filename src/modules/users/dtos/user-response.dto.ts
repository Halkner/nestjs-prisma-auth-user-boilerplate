import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: 'b123f85b-0d23-4b3d-9a92-b80f5c2c9905' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'example' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'email@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: '2024-02-06T12:00:00.000Z' })
  @Expose()
  created_at: Date;

  @ApiProperty({ example: '2024-02-06T12:00:00.000Z' })
  @Expose()
  updated_at: Date;

  @Exclude()
  password?: string;
}
