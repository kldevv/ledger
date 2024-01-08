import prisma from '@/server/db/prisma/client'
import { Category } from '@prisma/client'

export namespace DeleteOne {
  export type Args = {
    /**
     * Category id
     */
    id: string
  }

  export type Returns = Category
}

export const deleteOne = async ({
  id,
}: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    return await prisma.category.delete({
      where: {
        id,
      },
    })
  } catch (e) {
    throw e
  }
}
