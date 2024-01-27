import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, Entry, EntryStatus } from '@prisma/client'

export type GroupByMonthAndCategoryTypeProps = Pick<Entry, 'treasuryBookId'> & {
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
  treasuryBookId,
  year,
  status,
}: GroupByMonthAndCategoryTypeProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndCategoryTypeReturns>`
      SELECT
        EXTRACT(MONTH FROM e.transaction_date) as month,
        SUM(CASE WHEN e.amount > 0 THEN e.amount ELSE 0 END) as debit,
        SUM(CASE WHEN e.amount < 0 THEN -e.amount ELSE 0 END) as credit,
        c.type as id,
        c.type as name
      FROM
        entries e
      JOIN
        accounts a ON a.id = e.account_id
      JOIN
        categories c ON c.id = a.category_id
      WHERE
        e.treasury_book_id = ${treasuryBookId}
        ${
          year != null
            ? Prisma.sql`AND EXTRACT(YEAR FROM e.transaction_date) = ${year}`
            : Prisma.empty
        }
        ${
          status != null
            ? Prisma.sql`AND e.status = ${status}::entry_status`
            : Prisma.empty
        }
      GROUP BY
        month, c.type
      ORDER BY
        c.type, month;
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
