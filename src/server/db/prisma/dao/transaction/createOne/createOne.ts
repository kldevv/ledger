import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry, Transaction } from '@prisma/client'

export type CreateOneProps = Omit<
  Transaction,
  'createdDate' | 'updatedDate' | 'id'
> & {
  /**
   * List of tag ids to connect to
   */
  tagIds: string[]
  /**
   * List of entries of the transaction
   */
  entries: Omit<Entry, 'createdDate' | 'updatedDate' | 'id' | 'vaultId'>[]
}

export const createOne = async ({
  tagIds,
  entries,
  ...props
}: CreateOneProps) => {
  try {
    return await prisma.transaction.create({
      data: {
        ...props,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        entries: {
          createMany: {
            data: entries.map((entry) => ({
              ...entry,
              vaultId: props.vaultId,
            })),
          },
        },
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
      message: 'Error in Transaction DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
