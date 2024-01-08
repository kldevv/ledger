import { Prisma, type Account, type Category, type Entry } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

export type GroupByAccountAndDateProps = Pick<Entry, 'vaultId'> & {
  /**
   * Group by target
   */
  groupBy: 'YEAR' | 'MONTH' | 'QUARTER'
  /**
   * Accounting basis
   */
  basis: 'ACCRUAL' | 'CASH'
}

export type GroupByAccountAndDateReturns = (Pick<Entry, 'accountId'> &
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

export const groupByAccountAndDate = async ({
  vaultId,
  basis,
  groupBy,
}: GroupByAccountAndDateProps) => {
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

    return await prisma.$queryRaw<GroupByAccountAndDateReturns>`
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
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByAccountAndDate',
      error: parsePrismaError(e),
    })

    throw e
  }
}
