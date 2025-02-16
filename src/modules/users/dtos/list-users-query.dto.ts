import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { ORDER_FIELDS } from '@common/constants/order-fields';
import { Transform } from 'class-transformer';

export class ListUsersQueryDto {
  // Busca geral
  @IsOptional()
  @IsString()
  search?: string;

  // Ordenação
  @IsOptional()
  @IsString()
  orderBy?: keyof typeof ORDER_FIELDS.user;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  direction?: 'asc' | 'desc';

  // Paginação
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
