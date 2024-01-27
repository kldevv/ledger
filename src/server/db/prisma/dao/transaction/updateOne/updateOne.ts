import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry, Transaction } from '@prisma/client'

export type UpdateOneProps = Pick<Transaction, 'id' | 'treasuryBookId'> & {
  /**
   * Data
   */
  data: Data
}

type Data = Partial<
  Omit<Transaction, 'createdAt' | 'updatedAt' | 'id' | 'treasuryBookId'> & {
    /**
     * List of tag ids to connect to
     */
    tagIds: string[]
    /**
     * List of entries of the transaction
     */
    entries: Omit<
      Entry,
      'createdAt' | 'updatedAt' | 'id' | 'treasuryBookId' | 'transactionId'
    >[]
  }
>

export const updateOne = async ({
  id,
  treasuryBookId,
  data: { entries, tagIds, ...props },
}: UpdateOneProps) => {
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
      include: {
        tags: true,
        entries: {
          include: {
            account: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: updateOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
