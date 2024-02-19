import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry, Transaction } from '@prisma/client'

export type UpdateTransactionProps = Pick<
  Transaction,
  'id' | 'treasuryBookId'
> & {
  /**
   * Data
   */
  data: UpdateTransactionData
}

type UpdateTransactionData = Partial<
  Omit<
    Transaction,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'treasuryBookId'
  > & {
    /**
     * List of tag ids to connect to
     */
    tagIds: string[]
    /**
     * List of entries of the transaction
     */
    entries: Omit<
      Entry,
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
      | 'id'
      | 'treasuryBookId'
      | 'transactionId'
    >[]
  }
>

export const updateTransaction = async ({
  id,
  treasuryBookId,
  data: { entries, tagIds, ...props },
}: UpdateTransactionProps) => {
  try {
    return await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        ...props,
        tags: tagIds
          ? {
              set: [],
              connect: tagIds.map((id) => ({ id })),
            }
          : undefined,
        entries: entries
          ? {
              deleteMany: {},
              createMany: {
                data: entries.map((entry) => ({
                  treasuryBookId,
                  ...entry,
                })),
              },
            }
          : undefined,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: updateTransaction',
      error: parsePrismaError(e),
    })

    throw e
  }
}
