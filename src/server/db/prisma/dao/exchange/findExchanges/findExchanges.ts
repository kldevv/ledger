import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Exchange } from '@prisma/client'

export type FindExchangesProps = Pick<Exchange, 'ownerId'>

export const findExchanges = async (where: FindExchangesProps) => {
  try {
    return await prisma.exchange.findMany({
      where,
      include: {
        transactions: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Exchange DAO: findExchanges',
      error: parsePrismaError(e),
    })

    throw e
  }
}
