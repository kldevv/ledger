import prisma from '@/server/db/prisma/client'

import type { Transaction } from '@prisma/client'

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
  entries: Omit<EntryDao.CreateOne.Args, 'transactionId' | 'vaultId'>[]
}

export const createOne = async ({
  tagIds,
  entries,
  ...rest
}: CreateOne.Args) => {
  try {
    return await prisma.transaction.create({
      data: {
        ...rest,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        entries: {
          createMany: {
            data: entries.map((entry) => ({
              ...entry,
              vaultId: rest.vaultId,
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
      message: 'Error in Vault DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
