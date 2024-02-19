import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'

export type FindTreasuryBooksProps = Pick<TreasuryBook, 'ownerId'> &
  Partial<Pick<TreasuryBook, 'currency'>>

export const findTreasuryBooks = async (where: FindTreasuryBooksProps) => {
  try {
    return await prisma.treasuryBook.findMany({
      where,
      orderBy: {
        currency: 'asc',
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in TreasuryBook DAO: findTreasuryBooks',
      error: parsePrismaError(e),
    })

    throw e
  }
}
