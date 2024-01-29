import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry, Transaction } from '@prisma/client'

export type CreateTransactionProps = Pick<
  Transaction,
  'treasuryBookId' | 'accrualDate' | 'note'
> & {
  /**
   * Connect tags, this will not create new tags
   */
  tagIds: string[]
  /**
   * Create and connect entries
   */
  entries: Array<CreateEntryProps>
}

export type CreateEntryProps = Pick<
  Entry,
  | 'accountId'
  | 'amount'
  | 'memo'
  | 'transactionDate'
  | 'treasuryBookId'
  | 'status'
>

export const createTransaction = async ({
  tagIds,
  entries,
  treasuryBookId,
  ...props
}: CreateTransactionProps) => {
  try {
    return await prisma.transaction.create({
      data: {
        treasuryBookId,
        ...props,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        entries: {
          createMany: {
            data: entries,
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: createTransaction',
      error: parsePrismaError(e),
    })

    throw e
  }
}
