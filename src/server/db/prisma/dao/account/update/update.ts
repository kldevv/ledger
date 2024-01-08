import prisma from '@/server/db/prisma/client/client'

export namespace UpdateOne {
  export type Args = {
    /**
     * Account id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New account name
     */
    name?: string
    /**
     * New category id
     */
    categoryId?: string
  }
}

export const updateOne = async ({ id, data }: UpdateOne.Args) => {
  try {
    return await prisma.account.update({
      where: {
        id,
      },
      data,
      include: {
        category: true,
      },
    })
  } catch (e) {
    throw e
  }
}
