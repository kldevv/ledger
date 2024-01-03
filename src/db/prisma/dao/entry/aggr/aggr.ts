import prisma from "@/db/prisma/client"
import { Entry } from "@prisma/client"

export namespace ReadMinMaxTransactionDate {
  export type Args = Pick<Entry, 'vaultId'>
}

export const readMinMaxTransactionDate = async ({ vaultId }: ReadMinMaxTransactionDate.Args) => {
  try {
    return await prisma.entry.aggregate({
      where: {
        vaultId
      },
      _min: {
        transactionDate: true
      },
      _max: {
        transactionDate: true
      }
    })
  } catch (e) {

  }
}

export namespace ReadSum {
  export type Args = Pick<Entry, 'vaultId'> & {
    /**
     * Accrual date
     */
    accrualDate?: {
      lte: Date
    }
    /**
     * Transaction date
     */
    transactionDate?: {
      lte: Date
    }
  }
}

export const readSum = async ({ vaultId, accrualDate, transactionDate}: ReadSum.Args) => {
  try {
    const where = {
      transaction: {
        accrualDate,
      },
      transactionDate,
      vaultId,
    }

    const debit = await prisma.entry.aggregate({
      where: {
        ...where,
        amount: {
          gt: 0
        }
      },
      _sum: {
        amount: true
      },
      _count: true
    })

    const credit = await prisma.entry.aggregate({
      where: {
        ...where,
        amount: {
          lt: 0
        }
      },
      _sum: {
        amount: true
      },
      _count: true
    })


    return [debit, credit] as const
  } catch (e) {

  }
}