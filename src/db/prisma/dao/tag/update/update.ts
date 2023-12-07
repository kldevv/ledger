import prisma from "@/db/prisma/client"
import { Tag } from "@prisma/client"

export namespace UpdateOne {
  export type Args = {
    /**
     * Tag id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New tag name
     */
    name?: string
  }

  export type Returns = Tag
}

export const updateOne = async ({
  id,
  data
}: UpdateOne.Args): Promise<UpdateOne.Returns> => {
  try {
    return await prisma.tag.update({
      where: {
        id
      },
      data,
    })
  } catch (e) {
    throw e
  }
}