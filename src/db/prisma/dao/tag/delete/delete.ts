import prisma from "@/db/prisma/client"
import { Tag } from "@prisma/client"

export namespace DeleteOne {
  export type Args = {
    /**
     * Tag id
     */
    id: string
  }

  export type Returns = Tag
}

export const deleteOne = async ({ id }: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    return await prisma.tag.delete({
      where: {
        id,
      }
    })
  } catch (e) {
    throw e
  }
}