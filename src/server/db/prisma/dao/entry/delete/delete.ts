import prisma from '@/server/db/prisma/client/client'
import { Entry } from '@prisma/client'

export namespace DeleteOne {
  export type Args = Pick<Entry, 'id'>
}

export const deleteOne = async ({ id }: DeleteOne.Args) => {
  try {
    return await prisma.entry.delete({
      where: {
        id,
      },
    })
  } catch (e) {
    throw e
  }
}
