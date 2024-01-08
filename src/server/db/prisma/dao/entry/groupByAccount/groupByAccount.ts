import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Basis } from '@/api/graphql'
import type { Account, Category, Entry } from '@prisma/client'

export type GroupByAccountProps = Pick<Entry, 'vaultId'> & {
  /**
   * Start date
   */
  startDate?: Date
  /**
   * Basis
   */
  basis: Basis
}

export type GroupByAccountReturns = (Pick<Entry, 'accountId'> &
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

export const groupByAccount = async ({
  vaultId,
  startDate,
  basis,
}: GroupByAccountProps) => {
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

    return await prisma.$queryRaw<GroupByAccountReturns>`
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
        e."accountId", a."categoryId", c."type";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByAccount',
      error: parsePrismaError(e),
    })

    throw e
  }
}
