import { HttpException, HttpStatus } from '@nestjs/common';

abstract class AppError extends HttpException {
  public readonly errorCode: string;
  public readonly field: string;
  public readonly messages: string[];

  constructor(
    errorData: {
      errorCode: string;
      field: string;
      messages: string | string[];
    },
    status: number,
  ) {
    const formattedMessages = Array.isArray(errorData.messages)
      ? errorData.messages
      : [errorData.messages];

    super(
      {
        errors: [
          {
            field: errorData.field,
            messages: formattedMessages,
            errorCode: errorData.errorCode,
          },
        ],
      },
      status,
    );

    this.field = errorData.field;
    this.errorCode = errorData.errorCode;
    this.messages = formattedMessages;
  }
}

export class BadRequestError extends AppError {
  constructor(errorData: {
    errorCode: string;
    field: string;
    messages: string | string[];
  }) {
    super(errorData, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(errorData: {
    errorCode: string;
    field: string;
    messages: string | string[];
  }) {
    super(errorData, HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundError extends AppError {
  constructor(errorData: {
    errorCode: string;
    field: string;
    messages: string | string[];
  }) {
    super(errorData, HttpStatus.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(errorData: {
    errorCode: string;
    field: string;
    messages: string | string[];
  }) {
    super(errorData, HttpStatus.CONFLICT);
  }
}
