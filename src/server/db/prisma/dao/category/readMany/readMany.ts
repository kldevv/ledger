import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category } from '@prisma/client'

export type ReadManyProps = Partial<Pick<Category, 'type' | 'treasuryBookId'>>

export const readMany = async (where: ReadManyProps) => {
  try {
    return await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: {
            accounts: true,
          },
        },
      },
      orderBy: {
        type: 'asc',
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Category DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
