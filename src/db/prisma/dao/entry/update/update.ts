import prisma from "@/db/prisma/client"
import { Entry, EntryStatus } from "@prisma/client"

export namespace UpdateOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New transaction date
     */
    transactionDate?: Date
    /**
     * New account id
     */
    accountId?: string
    /**
     * New entry debit
     */
    debit?: number
    /**
     * New entry credit
     */
    credit?: number
    /**
     * New memorandum
     */
    memo?: string
    /**
     * New transaction id
     */
    transactionId: string
    /**
     * New status
     */
    status?: EntryStatus
  }

  export type Returns = Entry
}

export const updateOne = async ({ 
  id,
  data
 }: UpdateOne.Args): Promise<UpdateOne.Returns> => {
  try {
    return await prisma.entry.update({
      where: {
        id
      },
      data,
    })
  } catch (e) {
    throw e
  }
}