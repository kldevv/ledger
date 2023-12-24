import prisma from "@/db/prisma/client"
import { CategoryType, EntryStatus } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return await prisma.entry.findUnique({
      where: {
        id
      },
      include: {
        account: {
          include: {
            category: true
          }
        }
      }
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Transaction date
     */
    transactionDate?: Date
    /**
     * Account id
     */
    accountId?: string
    /**
     * Transaction id
     */
    transactionId?: string
    /**
     * Entry status
     */
    status?: EntryStatus
    /**
     * Vault id
     */
    vaultId?: string
    /**
     * Category id
     */
    categoryId?: string
    /**
     * Category type
     */
    categoryType?: CategoryType
  }
}

export const readMany = async ({ 
  transactionDate,
  accountId,
  transactionId,
  status,
  vaultId,
  categoryId,
  categoryType,
 }: ReadMany.Args) => {
  try {
    return await prisma.entry.findMany({
      where: {
        transactionDate,
        accountId,
        transactionId,
        status,
        vaultId,
        account: {
          categoryId,
          category: {
            type: categoryType
          }
        }
      },
      include: {
        account: {
          include: {
            category: true
          }
        }
      }
    })
  } catch (e) {
    throw e
  }
}