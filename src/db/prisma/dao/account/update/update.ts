import prisma from "@/db/prisma/client"
import { Account, Category, CategoryType } from "@prisma/client"

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
     * Account name
     */
    name?: string
    /**
     * Category id
     */
    categoryId?: string
  }

  export type Returns = Account
}

export const updateOne = async ({
  id,
  data
}: UpdateOne.Args): Promise<UpdateOne.Returns> => {
  try {
    return await prisma.account.update({
      where: {
        id
      },
      data,
    })
  } catch (e) {
    throw e
  }
}