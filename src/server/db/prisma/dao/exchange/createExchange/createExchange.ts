import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Exchange } from '@prisma/client'
import { CreateTransactionProps } from '../../transaction'

export type CreateExchangeProps = Pick<Exchange, 'ownerId'> & {
  /**
   * Create exchange origin transaction
   */
  origin: CreateTransactionProps
  /**
   * Create exchange destination transaction
   */
  destination: CreateTransactionProps
}

export const createExchange = async ({
  ownerId,
  origin: { entries: originEntries, ...originTransaction },
  destination: { entries: destinationEntries, ...destinationTransaction },
}: CreateExchangeProps) => {
  try {
    await prisma.exchange.create({
      data: {
        ownerId,
        transactions: {
          create: [
            { ...originTransaction, entries: { create: originEntries } },
            {
              ...destinationTransaction,
              entries: { create: destinationEntries },
            },
          ],
        },
      },
      include: {
        transactions: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Exchange DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
