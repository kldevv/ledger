import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Transaction } from '@prisma/client'

export type ReadMinMaxAccrualDate = Pick<Transaction, 'vaultId'>

export const readMinMaxAccrualDate = async (where: ReadMinMaxAccrualDate) => {
  try {
    return await prisma.transaction.aggregate({
      where,
      _min: {
        accrualDate: true,
      },
      _max: {
        accrualDate: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Transaction DAO: readMinMaxAccrualDate',
      error: parsePrismaError(e),
    })

    throw e
  }
}
