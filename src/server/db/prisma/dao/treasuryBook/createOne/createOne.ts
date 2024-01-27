import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'

export type CreateOneProps = Pick<TreasuryBook, 'name' | 'currency' | 'ownerId'>

export const createOne = async (data: CreateOneProps) => {
  try {
    return await prisma.treasuryBook.create({
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in TreasuryBook DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
