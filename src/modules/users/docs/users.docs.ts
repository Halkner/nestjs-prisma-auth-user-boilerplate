import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ListUsersResponseDTO } from '../dtos/list-users-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

export function ApiUsersControllerDocs() {
  return applyDecorators(ApiTags('Users'));
}

export function ApiListUsersDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Lista de usuários retornada com sucesso',
      type: ListUsersResponseDTO,
    }),
    ApiBadRequestResponse({
      description: 'Erro de validação nos parâmetros da query',
    }),
    ApiInternalServerErrorResponse({
      description: 'Problema no servidor e/ou banco de dados',
    }),
    ApiQuery({
      name: 'search',
      required: false,
      description:
        'Campo para busca geral de informações da usuário no banco de dados',
    }),
    ApiQuery({
      name: 'orderBy',
      required: false,
      enum: ['username', 'email', 'created_at', 'updated_at'],
      description: 'Campo para ordenação',
    }),
    ApiQuery({
      name: 'direction',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Direção da ordenação (ascendente ou descendente)',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      minimum: 1,
      description:
        'Número da página (deve ser maior ou igual a 1). Se não informado, retorna todos os registros.',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      minimum: 1,
      description:
        'Quantidade de itens por página (mínimo 1, máximo 100). Se não informado, retorna todos os registros.',
    }),
  );
}

export function ApiFindByIDUserDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Usuário retornado com sucesso',
      type: UserResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'ID do usuário não encontrado',
    }),
    ApiInternalServerErrorResponse({
      description: 'Problema no servidor e/ou banco de dados',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da usuário que será buscado',
    }),
  );
}

export function ApiUpdateUserDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'Usuário atualizado com sucesso' }),
    ApiBadRequestResponse({
      description: 'As senhas informadas não coincidem',
    }),
    ApiConflictResponse({
      description: 'Email informado já está em uso.',
    }),
    ApiNotFoundResponse({
      description: 'ID da usuário não encontrado',
    }),
    ApiBadRequestResponse({ description: 'Erro de validação' }),
    ApiInternalServerErrorResponse({
      description: 'Problema no servidor e/ou banco de dados',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do usuário que será atualizado',
    }),
  );
}

export function ApiDeleteUserDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'Usuário deletado com sucesso',
    }),
    ApiNotFoundResponse({
      description: 'ID do usuário não encontrado',
    }),
    ApiInternalServerErrorResponse({
      description: 'Problema no servidor e/ou banco de dados',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do usuário que será deletado',
    }),
  );
}
