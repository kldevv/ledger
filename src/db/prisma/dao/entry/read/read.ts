import prisma from "@/db/prisma/client"
import { EntryStatus } from "@prisma/client"
import { EntryDetail } from "../type"

export namespace ReadOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
  }

  export type Returns = EntryDetail | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
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
  }

  export type Returns = EntryDetail[]
}

export const readMany = async ({ 
  transactionDate,
  accountId,
  transactionId,
  status,
  vaultId
 }: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.entry.findMany({
      where: {
        transactionDate,
        accountId,
        transactionId,
        status,
        vaultId,
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