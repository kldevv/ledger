import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry, Transaction } from '@prisma/client'

export type CreateOneProps = Omit<
  Transaction,
  'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'exchangeId'
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
    | 'id'
    | 'treasuryBookId'
    | 'transactionId'
    | 'deletedAt'
  >[]
}

export const createOne = async ({
  tagIds,
  entries,
  treasuryBookId,
  ...props
}: CreateOneProps) => {
  const data = {
    treasuryBookId,
    ...props,
    tags: {
      connect: tagIds.map((id) => ({ id })),
    },
    entries: {
      createMany: {
        data: entries.map((entry) => ({
          ...entry,
          treasuryBookId,
        })),
      },
    },
  }

  try {
    return await prisma.transaction.create({
      data,
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
      message: 'Error in Transaction DAO: createOne',
      error: parsePrismaError(e),
      data,
    })

    throw e
  }
}
