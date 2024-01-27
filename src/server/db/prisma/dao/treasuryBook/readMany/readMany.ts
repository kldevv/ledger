import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'

export type ReadManyProps = Pick<TreasuryBook, 'ownerId'> &
  Partial<Pick<TreasuryBook, 'currency'>>

export const readMany = async (where: ReadManyProps) => {
  try {
    return await prisma.treasuryBook.findMany({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in TreasuryBook DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
