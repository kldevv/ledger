import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account, Entry } from '@prisma/client'

export type groupByMonthAndAccountProps = Pick<Entry, 'vaultId'> & {
  /**
   * Filter by year
   */
  year: number
}

export type groupByMonthAndAccountReturns = Array<{
  /**
   * Account id
   */
  id: Entry['accountId']
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
}: groupByMonthAndAccountProps) => {
  try {
    return await prisma.$queryRaw<groupByMonthAndAccountReturns>`
      SELECT
        EXTRACT(MONTH FROM e."transactionDate") as "month",
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as "credit",
        e."accountId" as "id",
        a."name" as "name"
      FROM
        "Entry" e
      JOIN
        "Account" a ON a."id" = e."accountId"
      WHERE
        e."vaultId" = ${vaultId}
        AND EXTRACT(YEAR FROM "transactionDate") = ${year}
      GROUP BY
        "month", e."accountId", a."name";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByAccountAndDate',
      error: parsePrismaError(e),
    })

    throw e
  }
}
