import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry, Transaction } from '@prisma/client'

export type UpdateOneProps = Pick<Transaction, 'id' | 'vaultId'> & {
  /**
   * Data
   */
  data: Data
}

type Data = Partial<
  Omit<Transaction, 'createdDate' | 'updatedDate' | 'id' | 'vaultId'> & {
    /**
     * List of tag ids to connect to
     */
    tagIds: string[]
    /**
     * List of entries of the transaction
     */
    entries: Omit<
      Entry,
      'createdDate' | 'updatedDate' | 'id' | 'vaultId' | 'transactionId'
    >[]
  }
>

export const updateOne = async ({
  id,
  vaultId,
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
                  vaultId,
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
