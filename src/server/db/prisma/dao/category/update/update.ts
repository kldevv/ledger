import prisma from '@/server/db/prisma/client/client'
import { Category, CategoryType } from '@prisma/client'

export namespace UpdateOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New category type
     */
    type?: CategoryType
    /**
     * New category name
     */
    name?: string
  }
}

export const updateOne = async ({ id, data }: UpdateOne.Args) => {
  try {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    throw e
  }
}
