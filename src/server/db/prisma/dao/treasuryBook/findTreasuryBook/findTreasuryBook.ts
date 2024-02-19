import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'

export type FindTreasuryBookProps = Pick<TreasuryBook, 'id'>

export const findTreasuryBook = async (where: FindTreasuryBookProps) => {
  try {
    return await prisma.treasuryBook.findUnique({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in TreasuryBook DAO: findTreasuryBook',
      error: parsePrismaError(e),
    })

    throw e
  }
}
