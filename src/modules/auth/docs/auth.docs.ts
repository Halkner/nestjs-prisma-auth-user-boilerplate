import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiAuthControllerDocs() {
  return applyDecorators(ApiTags('Auth'));
}

export function ApiSignInDocs() {
  return applyDecorators(
    ApiNoContentResponse({
      description: 'Usuário logado com sucesso',
    }),
    ApiUnauthorizedResponse({
      description: 'Usuário não autorizado',
    }),
    ApiBadRequestResponse({ description: 'Erro de validação' }),
    ApiInternalServerErrorResponse({
      description: 'Problema no servidor e/ou banco de dados',
    }),
  );
}

export function ApiSignUpDocs() {
  return applyDecorators(
    ApiNoContentResponse({
      description: 'Usuário criado com sucesso',
    }),
    ApiBadRequestResponse({
      description: 'As senhas informadas não coincidem',
    }),
    ApiConflictResponse({ description: 'Email informado já está em uso' }),
    ApiBadRequestResponse({ description: 'Erro de validação' }),
    ApiInternalServerErrorResponse({
      description: 'Problema no servidor e/ou banco de dados',
    }),
  );
}
