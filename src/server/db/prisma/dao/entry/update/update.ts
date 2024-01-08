import prisma from '@/server/db/prisma/client/client'
import { Entry } from '@prisma/client'

export namespace UpdateOne {
  export type Args = Pick<Entry, 'id'> & {
    /**
     * Update data
     */
    data: Data
  }

  export type Data = Partial<Omit<Entry, 'createdDate' | 'updatedDate' | 'id'>>
}

export const updateOne = async ({ id, data }: UpdateOne.Args) => {
  try {
    return await prisma.entry.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    throw e
  }
}
