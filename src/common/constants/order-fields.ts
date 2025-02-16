import { Prisma } from '@prisma/client';

export const ORDER_FIELDS = {
  user: (() => {
    const { id, ...fields } = Prisma.UserScalarFieldEnum;
    return fields;
  })(),
} as const;
