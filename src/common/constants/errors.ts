export const ERRORS = {
  USERS: {
    EMAIL_ALREADY_EXISTS: {
      errorCode: 'FMUSB001',
      field: 'email',
      messages: ['Email already exists.'],
    },
    PASSWORDS_DO_NOT_MATCH: {
      errorCode: 'FMAUS002',
      field: 'password',
      messages: ['The passwords do not match.'],
    },
    ID_NOT_FOUND: {
      errorCode: 'FMUSN001',
      field: 'id',
      messages: ['User ID not found.'],
    },
  },
  AUTH: {
    INVALID_AUTHENTICATION: {
      errorCode: 'FMAUB001',
      field: 'auth',
      messages: ['Invalid email or password'],
    },
  },
};
