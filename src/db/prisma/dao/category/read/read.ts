import prisma from "@/db/prisma/client"
import { Category, CategoryType } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Category id
     */
    id: string
  }

  export type Returns = Category | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.category.findUnique({
      where: {
        id
      }
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
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

  export type Returns = Category[]
}

export const readMany = async ({
  type,
  name,
  vaultId
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.category.findMany({
      where: {
        type,
        name,
        vaultId
      }
    })
  } catch (e) {
    throw e
  }
}