import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Transaction } from '@prisma/client'

export type ReadManyProps = Partial<
  Omit<Transaction, 'createdAt' | 'updatedAt' | 'id' | 'note'>
> & {
  /**
   * Tag id
   */
  tagId?: string
}

export const readMany = async ({ tagId, ...props }: ReadManyProps) => {
  try {
    return await prisma.transaction.findMany({
      where: {
        ...props,
        tags:
          tagId != null
            ? {
                some: {
                  id: tagId,
                },
              }
            : undefined,
      },
      include: {
        tags: true,
        entries: {
          include: {
            account: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        accrualDate: 'desc',
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
