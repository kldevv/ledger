import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Transaction } from '@prisma/client'

export type ReadOneProps = Pick<Transaction, 'id'>

export const readOne = async (where: ReadOneProps) => {
  try {
    return await prisma.transaction.findUnique({
      where,
      include: {
        tags: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: readOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
