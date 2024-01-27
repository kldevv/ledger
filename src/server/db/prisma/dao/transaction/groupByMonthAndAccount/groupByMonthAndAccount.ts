import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account, EntryStatus, Transaction } from '@prisma/client'

export type GroupByMonthAndAccountProps = Pick<
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

export type GroupByMonthAndAccountReturns = Array<{
  /**
   * Account id
   */
  id: Account['id']
  /**
   * Account name
   */
  name: Account['name']
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

export const groupByMonthAndAccount = async ({
  treasuryBookId,
  year,
  status,
}: GroupByMonthAndAccountProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndAccountReturns>`
      SELECT
        EXTRACT(MONTH FROM t."accrualDate") as "month",
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as "credit",
        a."id" as "id",
        a."name" as "name"
      FROM
        "Entry" e
      JOIN
        "Account" a ON a."id" = e."accountId"
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
        "month", a."id", a."name"
      ORDER BY
        a."name", "month";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: groupByAccountAndDate',
      error: parsePrismaError(e),
    })

    throw e
  }
}
