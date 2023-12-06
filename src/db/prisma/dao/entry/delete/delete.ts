import prisma from "@/db/prisma/client"
import { Entry } from "@prisma/client"

export namespace DeleteOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
  }

  export type Returns = Entry
}

export const deleteOne = async ({ id }: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    return await prisma.entry.delete({
      where: {
        id,
      }
    })
  } catch (e) {
    throw e
  }
}