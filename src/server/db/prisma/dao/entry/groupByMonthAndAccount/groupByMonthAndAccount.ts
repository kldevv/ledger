import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account, Entry, EntryStatus } from '@prisma/client'

export type GroupByMonthAndAccountProps = Pick<Entry, 'vaultId'> & {
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
  vaultId,
  year,
  status,
}: GroupByMonthAndAccountProps) => {
  try {
    return await prisma.$queryRaw<GroupByMonthAndAccountReturns>`
      SELECT
        EXTRACT(MONTH FROM e."transactionDate") as "month",
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as "credit",
        a."id" as "id",
        a."name" as "name"
      FROM
        "Entry" e
      JOIN
        "Account" a ON a."id" = e."accountId"
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
        "month", a."id", a."name"
      ORDER BY
        a."name", "month";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByMonthAndAccount',
      error: parsePrismaError(e),
    })

    throw e
  }
}
