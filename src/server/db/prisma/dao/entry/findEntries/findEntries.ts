import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account, Category, Entry, Transaction } from '@prisma/client'

export type FindEntriesProps = Partial<
  Pick<Entry, 'accountId' | 'status' | 'transactionId' | 'treasuryBookId'> &
    Pick<Account, 'categoryId'> &
    Pick<Category, 'type'> &
    Pick<Transaction, 'exchangeId'>
>

export const findEntries = async ({
  categoryId,
  type,
  exchangeId,
  ...props
}: FindEntriesProps) => {
  try {
    return await prisma.entry.findMany({
      where: {
        ...props,
        account: {
          categoryId,
          category: {
            type,
          },
        },
        transaction: {
          exchangeId,
        },
      },
      include: {
        account: {
          include: {
            category: true,
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: findEntries',
      error: parsePrismaError(e),
    })

    throw e
  }
}
