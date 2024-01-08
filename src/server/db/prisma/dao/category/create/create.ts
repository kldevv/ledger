import prisma from '@/server/db/prisma/client'
import { Category, CategoryType } from '@prisma/client'

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
     * Vault id
     */
    vaultId: string
  }

  export type Returns = Category
}

export const createOne = async ({
  type,
  name,
  vaultId,
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.category.create({
      data: {
        type,
        name,
        vaultId,
      },
    })
  } catch (e) {
    throw e
  }
}
