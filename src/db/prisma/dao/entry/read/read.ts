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

export namespace ReadAccrualMonthlySum {
  export type Args = {
    /**
     * Year to read
     */
    year: number;
  }
}

export const readAccrualMonthlySum = async () => {
  try {
    return await prisma.$queryRaw`
      SELECT
        e."accountId",
        EXTRACT(YEAR FROM t."accrualDate") as year,
        EXTRACT(MONTH FROM t."accrualDate") as month,
        CAST(COUNT(*) AS INTEGER) as count,
        SUM(e."credit") as credit,
        SUM(e."debit") as debit
      FROM
        "Entry" e
      JOIN
        "Transaction" t ON t."id" = e."transactionId"
      GROUP BY
        e."accountId", year, month;
    `
  } catch (e) {
    throw e
  }
}

export namespace ReadTransactionMonthlySum {
  export type Args = {
    /**
     * Year to read
     */
    year: number;
  }
}

export const readTransactionMonthlySum = async () => {
  try {
    return await prisma.$queryRaw`
      SELECT
        e."accountId",
        EXTRACT(YEAR FROM e."transactionDate") as year,
        EXTRACT(MONTH FROM e."transactionDate") as month,
        CAST(COUNT(*) AS INTEGER) as count,
        SUM(e."credit") as credit,
        SUM(e."debit") as debit
      FROM
        "Entry" e
      GROUP BY
        e."accountId", year, month;
    `
  } catch (e) {
    throw e
  }
}