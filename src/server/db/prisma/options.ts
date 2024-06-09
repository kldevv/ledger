import type { Prisma } from '@prisma/client'

/**
 * Prisma options
 */
export const prismaOptions: Prisma.Subset<
  Prisma.PrismaClientOptions,
  Prisma.PrismaClientOptions
> = {
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
}
