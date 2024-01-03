import prisma from "@/db/prisma/client";
import { Account, Category, Entry, EntryStatus, Prisma } from "@prisma/client";

export namespace GroupByDate {
  export type Filter = {
    /**
     * By year
     */
    year: number
    /**
     * By month
     */
    month: number
    /**
     * By status
     */
    status: EntryStatus | 'All'
  }

  export type Args = Pick<Entry, 'vaultId'> & {
    /**
     * Group by target
     */
    groupBy: 'YEAR' | 'MONTH' | 'QUARTER'
    /**
     * Accounting basis
     */
    basis: 'ACCRUAL' | 'CASH'
    /**
     * Amount handle
     */
    amountHandle: 'NET' | 'DEBIT_CREDIT'
    /**
     * Optional filter 
     */
    filter?: Filter
  };

  export type Returns = (Pick<Entry, 'accountId'> & Pick<Account, 'categoryId'> & Pick<Category, 'type'> & {
    /**
     * Month
     */
    groupBy: number;
    /**
     * Number of entries per group
     */
    count: number;
    /**
     * Total debit
     */
    debit?: number;
    /**
     * Total credit
     */
    credit?: number;
    /**
     * Total amount
     */
    amount?: number
  })[];
}


export const groupByDate = async ({ vaultId, amountHandle, basis, groupBy, filter }: GroupByDate.Args) => {
  try {
    const sumSelect = (() => {
      switch (amountHandle) {
        case 'NET':
          return Prisma.sql`SUM(e."amount") as amount,`
        case 'DEBIT_CREDIT':
          return Prisma.sql`
            SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as debit,
            SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as credit,
          `
      }
    })()

    const dateExtract = (() => {
      switch (groupBy) {
        case 'MONTH':
          return Prisma.sql`MONTH`
        case 'QUARTER':
          return Prisma.sql`QUARTER`
        case 'YEAR':
          return Prisma.sql`YEAR`
      }
    })()

    const [groupBySelect, transactionTableJoinClause] = (() => {
      switch (basis) {
        case 'ACCRUAL':
          return [
            Prisma.sql`EXTRACT(${dateExtract} FROM e."transactionDate") as "groupBy",`,
            Prisma.empty
          ]
        case 'CASH':
          return [
            Prisma.sql`EXTRACT(${dateExtract} FROM t."accrualDate") as "groupBy",`,
            Prisma.sql`JOIN "Transaction" t on t."id" = e."transactionId"`
          ]
      }
    })()

    return await prisma.$queryRaw<GroupByDate.Returns>`
      SELECT
        ${sumSelect}
        ${groupBySelect}
        CAST(COUNT(*) AS INTEGER) as count,
        e."accountId",
        a."categoryId",
        c."type"
      FROM
        "Entry" e
      ${transactionTableJoinClause}
      JOIN
        "Account" a on a."id" = e."accountId"
      JOIN
        "Category" c on c."id" = a."categoryId"
      WHERE
        e."vaultId" = ${vaultId}
      GROUP BY
        e."accountId", a."categoryId", c."type", "groupBy";
    `

  } catch (e) {
    throw e
  }
}
