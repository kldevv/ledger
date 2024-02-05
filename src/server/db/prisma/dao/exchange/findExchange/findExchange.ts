import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Exchange } from '@prisma/client'

export type FindExchangeProps = Pick<Exchange, 'id'>

export const findExchange = async (where: FindExchangeProps) => {
  try {
    return await prisma.exchange.findUnique({
      where,
      include: {
        transactions: {
          include: {
            entries: true,
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Exchange DAO: findExchange',
      error: parsePrismaError(e),
    })

    throw e
  }
}
