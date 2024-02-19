import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry } from '@prisma/client'

export type FindAccrualDateUniqueYearsProps = Pick<Entry, 'treasuryBookId'>

export type FindAccrualDateUniqueYearsReturns = Array<{
  /**
   * Year
   */
  year: number
}>

export const findAccrualDateUniqueYears = async ({
  treasuryBookId,
}: FindAccrualDateUniqueYearsProps) => {
  try {
    return await prisma.$queryRaw<FindAccrualDateUniqueYearsReturns>`
      SELECT
        DISTINCT EXTRACT(YEAR FROM accrual_date) as year
      FROM
        transactions
      WHERE
        treasury_book_id = ${treasuryBookId}
      ORDER BY 
        year;
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: findAccrualDateUniqueYears',
      error: parsePrismaError(e),
    })

    throw e
  }
}
