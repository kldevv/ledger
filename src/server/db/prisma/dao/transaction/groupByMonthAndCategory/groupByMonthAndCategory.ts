import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, EntryStatus, Transaction } from '@prisma/client'

export type GroupByMonthAndCategoryProps = Pick<
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

export type GroupByMonthAndCategoryReturns = Array<{
  /**
   * Category id
   */
  id: Category['id']
  /**
   * Category name
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
  treasuryBookId,
  year,
  status,
}: GroupByMonthAndCategoryProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndCategoryReturns>`
      SELECT
        EXTRACT(MONTH FROM t.accrual_date) as month,
        SUM(CASE WHEN e.amount > 0 THEN e.amount ELSE 0 END) as debit,
        SUM(CASE WHEN e.amount < 0 THEN -e.amount ELSE 0 END) as credit,
        c.id as id,
        c.name as name
      FROM
        entries e
      JOIN
        accounts a ON a.id = e.account_id
      JOIN
        categories c ON c.id = a.category_id
      JOIN
        transactions t ON t.id = e.transaction_id
      WHERE
        e.treasury_book_id = ${treasuryBookId}
        ${
          year != null
            ? Prisma.sql`AND EXTRACT(YEAR FROM t.accrual_date) = ${year}`
            : Prisma.empty
        }
        ${
          status != null
            ? Prisma.sql`AND e.status = ${status}::entry_status`
            : Prisma.empty
        }
      GROUP BY
        month, c.id, c.name
      ORDER BY
        c.name, month;
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: groupByMonthAndCategory',
      error: parsePrismaError(e),
    })

    throw e
  }
}
