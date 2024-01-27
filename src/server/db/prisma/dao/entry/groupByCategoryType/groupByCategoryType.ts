import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, Entry, EntryStatus } from '@prisma/client'

export type GroupByCategoryTypeProps = Pick<Entry, 'treasuryBookId'> & {
  /**
   * Filter by year
   */
  year?: number
  /**
   * Filter by entry status
   */
  status?: EntryStatus
}

export type GroupByCategoryTypeReturns = Array<{
  /**
   * Category type
   */
  id: Category['type']
  /**
   * Category type
   */
  name: Category['type']
  /**
   * Total debit
   */
  debit: number
  /**
   * Total credit
   */
  credit: number
}>

export const groupByCategoryType = async ({
  treasuryBookId,
  year,
  status,
}: GroupByCategoryTypeProps) => {
  try {
    return await prisma.$queryRaw<GroupByCategoryTypeReturns>`
      SELECT
        SUM(CASE WHEN e.amount > 0 THEN e.amount ELSE 0 END) as debit,
        SUM(CASE WHEN e.amount < 0 THEN -e.amount ELSE 0 END) as credit,
        c.type as id,
        c.type as name
      FROM
        entries e
      JOIN
        accounts a on a.id = e.account_id
      JOIN
        categories c on c.id = a.category_id
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
        c.type;
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByCategoryType',
      error: parsePrismaError(e),
    })

    throw e
  }
}
