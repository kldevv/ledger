import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, Entry, EntryStatus } from '@prisma/client'

export type GroupByMonthAndCategoryProps = Pick<Entry, 'vaultId'> & {
  /**
   * Filter by year
   */
  year?: number
  /**
   * Filter by entry status
   */
  status?: EntryStatus
}

export type GroupByMonthAndCategoryReturns = Array<{
  /**
   * Account id
   */
  id: Category['id']
  /**
   * Account name
   */
  name: Category['name']
  /**
   * Month
   */
  month: number
  /**
   * Total debit
   */
  debit: number
  /**
   * Total credit
   */
  credit: number
}>

export const groupByMonthAndCategory = async ({
  vaultId,
  year,
  status,
}: GroupByMonthAndCategoryProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndCategoryReturns>`
      SELECT
        EXTRACT(MONTH FROM e."transactionDate") as "month",
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as "credit",
        c."id" as "id",
        c."name" as "name"
      FROM
        "Entry" e
      JOIN
        "Account" a ON a."id" = e."accountId"
      JOIN
        "Category" c ON c."id" = a."categoryId"
      WHERE
        e."vaultId" = ${vaultId}
        ${
          year != null
            ? Prisma.sql`AND EXTRACT(YEAR FROM e."transactionDate") = ${year}`
            : Prisma.empty
        }
        ${status != null ? Prisma.sql`AND e.status = ${status}` : Prisma.empty}
      GROUP BY
        "month", c."id", c."name"
      ORDER BY
        "name", "month";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByMonthAndCategory',
      error: parsePrismaError(e),
    })

    throw e
  }
}
