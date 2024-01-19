import { type Entry } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

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
        EXTRACT(MONTH FROM "transactionDate") as "month",
        SUM(CASE WHEN "amount" > 0 THEN "amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN "amount" < 0 THEN -"amount" ELSE 0 END) as "credit",
        "accountId" as "id"
      FROM
        "Entry" e
      WHERE
        "vaultId" = ${vaultId}
        AND EXTRACT(YEAR FROM "transactionDate") = ${year}
      GROUP BY
        "month", "accountId";
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
