import prisma from "@/db/prisma/client"
import { Category, CategoryType } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Category id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return {
      id,
      name: 'Cat A',
      type: CategoryType.LIABILITIES,
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
      vaultId: '000'
    }
    // return await prisma.category.findUnique({
    //   where: {
    //     id
    //   }
    // })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Category type
     */
    type?: CategoryType
    /**
     * Category name
     */
    name?: string
    /**
     * Vault id
     */
    vaultId?: string
  }

  export type Returns = Category[]
}

export const readMany = async ({
  type,
  name,
  vaultId
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return [
      {
        id: '111',
        name: 'Cat A',
        type: 'LIABILITIES',
        createdDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        vaultId: vaultId ?? '0'
      },
      {
        id: '112',
        name: 'Cat B',
        type: 'EQUITY',
        createdDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        vaultId: vaultId ?? '0'
      },
      {
        id: '113',
        name: 'Cat C',
        type: 'ASSETS',
        createdDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
        vaultId: vaultId ?? '0'
      }
    ]

    // return await prisma.category.findMany({
    //   where: {
    //     type,
    //     name,
    //     vaultId
    //   }
    // })
  } catch (e) {
    throw e
  }
}