import { Prisma } from '@prisma/client';

export const SEARCHABLE_FIELDS = {
  user: (() => {
    const { id, created_at, updated_at, ...fields } =
      Prisma.UserScalarFieldEnum;
    return Object.values(fields);
  })(),
} as const;
