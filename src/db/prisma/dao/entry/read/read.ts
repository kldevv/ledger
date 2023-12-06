import prisma from "@/db/prisma/client"
import { Entry, EntryStatus } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
  }

  export type Returns = Entry | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.entry.findUnique({
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
  }

  export type Returns = Entry[]
}

export const readMany = async ({ 
  transactionDate,
  accountId,
  transactionId,
  status
 }: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.entry.findMany({
      where: {
        transactionDate,
        accountId,
        transactionId,
        status
      }
    })
  } catch (e) {
    throw e
  }
}