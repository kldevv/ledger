import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry } from '@prisma/client'

export type ReadUniqueYearProps = Pick<Entry, 'vaultId'>

export type ReadUniqueYearReturns = Array<{
  /**
   * Year
   */
  year: number
}>

export const readUniqueYear = async ({ vaultId }: ReadUniqueYearProps) => {
  try {
    return await prisma.$queryRaw<ReadUniqueYearReturns>`
      SELECT
        DISTINCT EXTRACT(YEAR FROM "accrualDate") as "year"
      FROM
        "Transaction"
      WHERE
        "vaultId" = ${vaultId}
      ORDER BY 
        "year";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: readUniqueYear',
      error: parsePrismaError(e),
    })

    throw e
  }
}
