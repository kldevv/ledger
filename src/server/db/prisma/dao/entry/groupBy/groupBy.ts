import { Basis } from '@/api/graphql'
import prisma from '@/server/db/prisma/client'
import { Account, Category, Entry, EntryStatus, Prisma } from '@prisma/client'

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
     * Optional filter
     */
    filter?: Filter
  }

  export type Returns = (Pick<Entry, 'accountId'> &
    Pick<Account, 'categoryId'> &
    Pick<Category, 'type'> & {
      /**
       * Group by
       */
      groupBy: number
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
    })[]
}

export const groupByDate = async ({
  vaultId,
  basis,
  groupBy,
  filter,
}: GroupByDate.Args) => {
  try {
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

    const [groupByDateSelect, transactionTableJoinClause] = (() => {
      switch (basis) {
        case 'CASH':
          return [
            Prisma.sql`EXTRACT(${dateExtract} FROM e."transactionDate") as "groupBy",`,
            Prisma.empty,
          ]
        case 'ACCRUAL':
          return [
            Prisma.sql`EXTRACT(${dateExtract} FROM t."accrualDate") as "groupBy",`,
            Prisma.sql`JOIN "Transaction" t on t."id" = e."transactionId"`,
          ]
      }
    })()

    return await prisma.$queryRaw<GroupByDate.Returns>`
      SELECT
        ${groupByDateSelect}
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as debit,
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as credit,
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

export namespace GroupBy {
  export type Args = Pick<Entry, 'vaultId'> & {
    /**
     * Start date
     */
    startDate?: Date
    /**
     * Basis
     */
    basis: Basis
  }

  export type Returns = (Pick<Entry, 'accountId'> &
    Pick<Account, 'categoryId'> &
    Pick<Category, 'type'> & {
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
    })[]
}

export const groupBy = async ({ vaultId, startDate, basis }: GroupBy.Args) => {
  try {
    const [transactionTableJoinClause, whereStartDateFilter] = (() => {
      switch (basis) {
        case 'CASH':
          return [
            Prisma.empty,
            Prisma.sql`e."transactionDate" >= ${startDate?.toISOString()}`,
          ]
        case 'ACCRUAL':
          return [
            Prisma.sql`JOIN "Transaction" t on t."id" = e."transactionId"`,
            Prisma.sql`t."accrualDate" >= ${startDate?.toISOString()}`,
          ]
      }
    })()

    return await prisma.$queryRaw<GroupBy.Returns>`
      SELECT
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as debit,
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as credit,
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
        AND ${whereStartDateFilter}
      GROUP BY
        e."accountId", a."categoryId", c."type", "groupBy";
    `
  } catch (e) {}
}
