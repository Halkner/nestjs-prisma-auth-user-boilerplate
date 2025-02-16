import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: '7cf44d6a-5cf6-4568-b14b-5b0ec8b73853',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
