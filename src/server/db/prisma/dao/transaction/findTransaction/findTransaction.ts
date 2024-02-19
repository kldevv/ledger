import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Transaction } from '@prisma/client'

export type FindTransactionProps = Pick<Transaction, 'id'>

export const findTransaction = async (where: FindTransactionProps) => {
  try {
    return await prisma.transaction.findUnique({
      where,
      include: {
        tags: true,
        entries: {
          select: {
            amount: true,
            status: true,
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: findTransaction',
      error: parsePrismaError(e),
    })

    throw e
  }
}
