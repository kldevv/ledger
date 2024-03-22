import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { EntryStatus, Transaction } from '@prisma/client'

export type FindTransactionsProps = Partial<
  Pick<Transaction, 'treasuryBookId'>
> & {
  /**
   * Relational field: tag id
   */
  tagId?: string
  /**
   * Relational field: entry status
   */
  status?: EntryStatus
}

export const findTransactions = async (props: FindTransactionsProps) => {
  const { tagId, status, ...findTransactions } = props

  try {
    return await prisma.transaction.findMany({
      where: {
        ...findTransactions,
        entries:
          status != null
            ? {
                every: {
                  status,
                },
              }
            : undefined,
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
          select: {
            amount: true,
            status: true,
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
      message: 'Error in Transaction DAO: findTransactions',
      args: props,
      error: parsePrismaError(e),
    })

    throw e
  }
}
