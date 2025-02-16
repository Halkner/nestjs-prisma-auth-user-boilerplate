import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class ListUsersResponseDTO {
  @ApiProperty({
    type: [UserResponseDto],
    description: 'Lista de usuarios',
  })
  data: UserResponseDto[];

  @ApiProperty({
    example: 1,
    description: 'Número total de registros',
    required: false,
  })
  total?: number;

  @ApiPropertyOptional({ example: 1, description: 'Página atual da paginação' })
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de itens por página',
  })
  limit?: number;
}
