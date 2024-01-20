import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, Entry, EntryStatus } from '@prisma/client'

export type GroupByMonthAndCategoryTypeProps = Pick<Entry, 'vaultId'> & {
  /**
   * Filter by year
   */
  year?: number
  /**
   * Filter by entry status
   */
  status?: EntryStatus
}

export type GroupByMonthAndCategoryTypeReturns = Array<{
  /**
   * Category id
   */
  id: Category['type']
  /**
   * Category type
   */
  name: Category['type']
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

export const groupByMonthAndCategoryType = async ({
  vaultId,
  year,
  status,
}: GroupByMonthAndCategoryTypeProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndCategoryTypeReturns>`
      SELECT
        EXTRACT(MONTH FROM e."transactionDate") as "month",
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as "credit",
        c."type" as "id",
        c."type" as "name"
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
        ${
          status != null
            ? Prisma.sql`AND e.status = ${status}::"EntryStatus"`
            : Prisma.empty
        }
      GROUP BY
        "month", c."type"
      ORDER BY
        c."type", "month";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByMonthAndCategoryType',
      error: parsePrismaError(e),
    })

    throw e
  }
}
