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

export namespace ReadSum {
  export type Args = {
    /**
     * Year
     */
    year: number
    /**
     * Month
     */
    month: number
    /**
     * Date type
     */
    dateType?: 'transaction' | 'accrual'
  }
}

export namespace ReadSumsByAccrualMonth {
  export type Args = {
    /**
     * Year to read
     */
    year: number;
    /**
    * Vault id
    */
    vaultId: string
  }

  export type Returns = {
    /**
     * Account id
     */
    accountId: string
    /**
     * Category id
     */
    categoryId: string
    /**
     * Category type
     */
    type: CategoryType
    /**
     * Month
     */
    month: number
    /**
     * Year
     */
    year: number
    /**
     * Number of entries per group
     */
    count: number
    /**
     * Total debit
     */
    debit: number
    /**
     * Total credit
     */
    credit: number
  }[]
}

export const readSumsByAccrualMonth = async ({ year, vaultId }: ReadSumsByAccrualMonth.Args) => {
  try {
    return await prisma.$queryRaw<ReadSumsByAccrualMonth.Returns>`
      SELECT
        e."accountId",
        a."categoryId",
        c."type",
        EXTRACT(MONTH FROM t."accrualDate") as month,
        EXTRACT(YEAR FROM t."accrualDate") as year,
        CAST(COUNT(*) AS INTEGER) as count,
        SUM(e."credit") as credit,
        SUM(e."debit") as debit
      FROM
        "Entry" e
      JOIN
        "Transaction" t ON t."id" = e."transactionId"
      JOIN
        "Account" a on a."id" = e."accountId"
      JOIN
        "Category" c on c."id" = a."categoryId"
      WHERE
        e."vaultId" = ${vaultId}
      GROUP BY
        e."accountId", a."categoryId", c."type", month, year;
    `
  } catch (e) {
    throw e
  }
}

export namespace ReadSumsByTransactionMonth {
  export type Args = {
    /**
     * Year to read
     */
    year: number;
    /**
    * Vault id
    */
    vaultId: string
  }

  export type Returns = {
    /**
     * Account id
     */
    accountId: string
    /**
     * Category id
     */
    categoryId: string
    /**
     * Category type
     */
    type: CategoryType
    /**
     * Month
     */
    month: number
    /**
     * Year
     */
    year: number
    /**
     * Number of entries per group
     */
    count: number
    /**
     * Total debit
     */
    debit: number
    /**
     * Total credit
     */
    credit: number
  }[]
}

export const readSumsByTransactionMonth = async ({ vaultId, year }: ReadSumsByTransactionMonth.Args) => {
  try {
    return await prisma.$queryRaw<ReadSumsByTransactionMonth.Returns>`
      SELECT
        e."accountId",
        a."categoryId",
        c."type",
        EXTRACT(MONTH FROM e."transactionDate") as month,
        EXTRACT(YEAR FROM e."transactionDate") as year,
        CAST(COUNT(*) AS INTEGER) as count,
        SUM(e."credit") as credit,
        SUM(e."debit") as debit
      FROM
        "Entry" e
      JOIN
        "Account" a on a."id" = e."accountId"
      JOIN
        "Category" c on c."id" = a."categoryId"
      WHERE
        e."vaultId" = ${vaultId}
      GROUP BY
        e."accountId", a."categoryId", c."type", month, year;
    `
  } catch (e) {
    throw e
  }
}