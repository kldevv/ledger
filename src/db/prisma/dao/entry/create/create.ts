import prisma from "@/db/prisma/client"
import { EntryStatus } from "@prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Transaction date
     */
    transactionDate: Date
    /**
     * Account id
     */
    accountId: string
    /**
     * Entry debit
     */
    debit: number
    /**
     * Entry credit
     */
    credit: number
    /**
     * Optional memorandum, default is `undefined`
     */
    memo?: string
    /**
     * Transaction id
     */
    transactionId: string
    /**
     * Optional status, default is `PENDING`
     */
    status?: EntryStatus
    /**
     * Vault id
     */
    vaultId: string
  }
}

export const createOne = async ({ 
  transactionDate,
  accountId,
  debit,
  credit,
  transactionId,
  memo,
  status = EntryStatus.PENDING,
  vaultId,
 }: CreateOne.Args) => {
  try {
    await prisma.entry.create({
      data: {
        transactionDate,
        accountId,
        debit,
        credit,
        transactionId,
        memo,
        status,
        vaultId,
      }
    })
  } catch (e) {
    throw e
  }
}