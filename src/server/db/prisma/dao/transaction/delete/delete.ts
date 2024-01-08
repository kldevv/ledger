import prisma from '@/server/db/prisma/client/client'
import { Transaction } from '@prisma/client'

export namespace DeleteOne {
  export type Args = Pick<Transaction, 'id'>
}

export const deleteOne = async ({ id }: DeleteOne.Args) => {
  try {
    return await prisma.transaction.delete({
      where: {
        id,
      },
      include: { tags: true, entries: true },
    })
  } catch (e) {
    throw e
  }
}
