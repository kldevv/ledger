import prisma from '@/server/db/prisma/client/client'

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
}

export const updateOne = async ({ id, data }: UpdateOne.Args) => {
  try {
    return await prisma.tag.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    throw e
  }
}
