import prisma from '@/server/db/prisma/client/client'
import { Account, Category, Entry } from '@prisma/client'

export namespace ReadOne {
  export type Args = Pick<Entry, 'id'>
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return await prisma.entry.findUnique({
      where: {
        id,
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
    throw e
  }
}

export namespace ReadMany {
  export type Args = Partial<
    Omit<Entry, 'createdDate' | 'updatedDate' | 'amount' | 'memo'> &
      Pick<Account, 'categoryId'> &
      Pick<Category, 'type'>
  >
}

export const readMany = async ({
  categoryId,
  type,
  ...rest
}: ReadMany.Args) => {
  try {
    return await prisma.entry.findMany({
      where: {
        ...rest,
        account: {
          categoryId,
          category: {
            type,
          },
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
    throw e
  }
}
