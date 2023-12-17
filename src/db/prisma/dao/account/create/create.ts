import prisma from "@/db/prisma/client"
import { CategoryType } from "@prisma/client"

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
    /**
     * Vault id
     */
    vaultId: string
  }
}

export const createOne = async ({
  name,
  categoryId,
  vaultId
}: CreateOne.Args) => {
  try {
    return {
      id: '000',
      name,
      vaultId,
      category: {
        vaultId,
        id: categoryId,
        name: 'Test category',
        createdDate: new Date(),
        updatedDate: new Date(),
        type: CategoryType.ASSETS
      },
      createdDate: new Date(),
      updatedDate: new Date(),
    }
    // return await prisma.account.create({
    //   data: {
    //     name,
    //     categoryId,
    //     vaultId,
    //   },
    //   include: {
    //     category: true
    //   }
    // })
  } catch (e) {
    throw e
  }
}