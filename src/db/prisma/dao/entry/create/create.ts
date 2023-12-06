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
     * Entry debit, should be `0` if credit is not `0`
     */
    debit: number
    /**
     * Entry credit, should be `0` if debit is not `0`
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
 }: CreateOne.Args) => {
  try {
    if (debit === 0 && credit === 0) {
      throw Error('Debit and credit cannot be both zero')
    }

    if (debit < 0 || credit < 0) {
      throw Error('Debit or credit cannot be less than zero')
    }

    if (debit * credit !== 0) {
      throw Error('Either debit or credit should be zero')
    }

    await prisma.entry.create({
      data: {
        transactionDate,
        accountId,
        debit,
        credit,
        transactionId,
        memo,
        status
      }
    })
  } catch (e) {
    throw e
  }
}