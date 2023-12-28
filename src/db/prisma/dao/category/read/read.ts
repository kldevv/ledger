import prisma from "@/db/prisma/client"
import { CategoryType } from "@prisma/client"

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
}

export const readMany = async ({
  type,
  name,
  vaultId
}: ReadMany.Args) => {
  try {
    return await prisma.category.findMany({
      where: {
        type,
        name,
        vaultId
      },
      include: {
        accounts: true
      }
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadGroupByType {
  export type Args = {
    /**
     * Vault id
     */
    vaultId: string
  }
}

export const readGroupByType = async ({
  vaultId
}: ReadMany.Args) => {
  try {
    return await prisma.category.groupBy({
      by: ['type'],
      where: {
        vaultId
      },
    })
  } catch (e) {
    throw e
  }
}