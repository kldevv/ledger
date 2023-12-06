import prisma from "@/db/prisma/client"
import { Category, CategoryType } from "@prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Category type
     */
    type: CategoryType
    /**
     * Category name
     */
    name: string
    /**
     * Wallet id
     */
    walletId: string
  }

  export type Returns = Category
}

export const createOne = async ({
  type,
  name,
  walletId
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.category.create({
      data: {
        type,
        name,
        walletId
      }
    })
  } catch (e) {
    throw e
  }
}