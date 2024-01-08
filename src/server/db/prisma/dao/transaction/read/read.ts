import prisma from '@/server/db/prisma/client/client'
import { Transaction } from '@prisma/client'

export namespace ReadOne {
  export type Args = Pick<Transaction, 'id'>
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = Partial<
    Omit<Transaction, 'createdDate' | 'updatedDate' | 'id'>
  > & {
    /**
     * Tag id
     */
    tagId?: string
  }
}

export const readMany = async ({
  accrualDate,
  vaultId,
  note,
  tagId,
}: ReadMany.Args) => {
  try {
    return await prisma.transaction.findMany({
      where: {
        accrualDate,
        vaultId,
        note,
        tags: tagId
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
    throw e
  }
}
