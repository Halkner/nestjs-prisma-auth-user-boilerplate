// global-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse = {
      errors: [
        {
          field: 'unknown',
          messages: ['Internal server error'],
          errorCode: 'INTERNAL_SERVER_ERROR',
        },
      ],
    };

    // Se for uma exceção do Nest (HttpException), usa os detalhes do erro já formatado
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null) {
        errorResponse = res as any;
      } else {
        errorResponse = {
          errors: [
            {
              field: 'unknown',
              messages: [typeof res === 'string' ? res : JSON.stringify(res)],
              errorCode: 'HTTP_EXCEPTION',
            },
          ],
        };
      }
    } else if (exception instanceof Error) {
      // Para outras exceções, usa uma mensagem de erro padrão
      errorResponse = {
        errors: [
          {
            field: 'unknown',
            messages: [
              'An unexpected error occurred on our server. Please try again later. If the problem persists, contact support.',
            ],
            errorCode: 'INTERNAL_SERVER_ERROR',
          },
        ],
      };
    }

    response.status(status).json(errorResponse);
  }
}
