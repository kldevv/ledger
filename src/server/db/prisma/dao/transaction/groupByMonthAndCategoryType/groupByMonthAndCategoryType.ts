import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, EntryStatus, Transaction } from '@prisma/client'

export type GroupByMonthAndCategoryTypeProps = Pick<
  Transaction,
  'treasuryBookId'
> & {
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
   * Category type
   */
  id: Category['id']
  /**
   * Category type
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

export const groupByMonthAndCategoryType = async ({
  treasuryBookId,
  year,
  status,
}: GroupByMonthAndCategoryTypeProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndCategoryTypeReturns>`
      SELECT
        EXTRACT(MONTH FROM t."accrualDate") as "month",
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
      JOIN
        "Transaction" t ON t."id" = e."transactionId"
      WHERE
        e."treasuryBookId" = ${treasuryBookId}
        ${
          year != null
            ? Prisma.sql`AND EXTRACT(YEAR FROM t."accrualDate") = ${year}`
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
      message: 'Error in Transaction DAO: groupByMonthAndCategoryType',
      error: parsePrismaError(e),
    })

    throw e
  }
}
