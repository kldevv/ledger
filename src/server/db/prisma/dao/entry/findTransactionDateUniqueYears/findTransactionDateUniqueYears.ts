import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry } from '@prisma/client'

export type FindTransactionDateUniqueYearsProps = Pick<Entry, 'treasuryBookId'>

export type FindTransactionDateUniqueYearsReturns = Array<{
  /**
   * Year
   */
  year: number
}>

export const findTransactionDateUniqueYears = async ({
  treasuryBookId,
}: FindTransactionDateUniqueYearsProps) => {
  try {
    return await prisma.$queryRaw<FindTransactionDateUniqueYearsReturns>`
      SELECT
        DISTINCT EXTRACT(YEAR FROM transaction_date) as "year"
      FROM
        entries
      WHERE
        treasury_book_id = ${treasuryBookId}
      ORDER BY 
        year;
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: findTransactionDateUniqueYears',
      error: parsePrismaError(e),
    })

    throw e
  }
}
