import prisma from "@/db/prisma/client"
import { Account } from "@prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Account name
     */
    name: string
    /**
     * Category id
     */
    categoryId: string
  }

  export type Returns = Account
}

export const createOne = async ({
  name,
  categoryId
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.account.create({
      data: {
        name,
        categoryId
      }
    })
  } catch (e) {
    throw e
  }
}