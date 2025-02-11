import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    const exceptionResponse = exception.getResponse() as any;
    const validationErrors = exceptionResponse.message;

    // Organiza os erros por campo
    const groupedErrors: Record<string, string[]> = {};

    validationErrors.forEach((msg: string) => {
      const fieldMatch = /^(\w+)\s/.exec(msg); // Captura o nome do campo no início da string
      if (fieldMatch) {
        const field = fieldMatch[1];
        if (!groupedErrors[field]) {
          groupedErrors[field] = [];
        }
        groupedErrors[field].push(msg);
      }
    });

    // Formata os erros no padrão desejado
    const formattedErrors = Object.entries(groupedErrors).map(
      ([field, messages]) => ({
        field,
        messages,
        errorCode: 'VALIDATION_ERR',
      }),
    );

    response.status(status).json({
      errors: formattedErrors,
    });
  }
}
