import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account, Entry, EntryStatus } from '@prisma/client'

export type GroupByAccountProps = Pick<Entry, 'treasuryBookId'> & {
  /**
   * Filter by year
   */
  year?: number
  /**
   * Filter by entry status
   */
  status?: EntryStatus
}

export type GroupByAccountReturns = Array<{
  /**
   * Account id
   */
  id: Account['id']
  /**
   * Account name
   */
  name: Account['name']
  /**
   * Total debit
   */
  debit: number
  /**
   * Total credit
   */
  credit: number
}>

export const groupByAccount = async ({
  treasuryBookId,
  year,
  status,
}: GroupByAccountProps) => {
  try {
    return await prisma.$queryRaw<GroupByAccountReturns>`
      SELECT
        SUM(CASE WHEN e.amount > 0 THEN e.amount ELSE 0 END) as debit,
        SUM(CASE WHEN e.amount < 0 THEN -e.amount ELSE 0 END) as credit,
        a.id as id,
        a.name as name
      FROM
        entries e
      JOIN
        accounts a on a.id = e.account_id
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
        a.id, a.name;
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
