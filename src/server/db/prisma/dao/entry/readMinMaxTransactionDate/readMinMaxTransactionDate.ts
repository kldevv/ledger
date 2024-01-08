import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry } from '@prisma/client'

export type ReadMinMaxTransactionDateProps = Pick<Entry, 'vaultId'>

export const readMinMaxTransactionDate = async ({
  vaultId,
}: ReadMinMaxTransactionDateProps) => {
  try {
    return await prisma.entry.aggregate({
      where: {
        vaultId,
      },
      _min: {
        transactionDate: true,
      },
      _max: {
        transactionDate: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: readMinMaxTransactionDate',
      error: parsePrismaError(e),
    })

    throw e
  }
}
