import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { CreateTransactionProps } from '../../transaction'
import type { Exchange } from '@prisma/client'

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
  origin: {
    entries: originEntries,
    tagIds: originTagIds,
    ...originTransaction
  },
  destination: {
    entries: destinationEntries,
    tagIds: destinationTagIds,
    ...destinationTransaction
  },
}: CreateExchangeProps) => {
  try {
    return await prisma.exchange.create({
      data: {
        ownerId,
        transactions: {
          create: [
            {
              ...originTransaction,
              tags: {
                connect: originTagIds.map((id) => ({ id })),
              },
              entries: { createMany: { data: originEntries } },
            },
            {
              ...destinationTransaction,
              tags: {
                connect: destinationTagIds.map((id) => ({ id })),
              },
              entries: {
                createMany: {
                  data: destinationEntries,
                },
              },
            },
          ],
        },
      },
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
      message: 'Error in Exchange DAO: createExchange',
      error: parsePrismaError(e),
    })

    throw e
  }
}
