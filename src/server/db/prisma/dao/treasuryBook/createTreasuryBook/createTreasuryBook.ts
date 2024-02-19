import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'

export type CreateTreasuryBookProps = Pick<
  TreasuryBook,
  'name' | 'currency' | 'ownerId'
>

export const createTreasuryBook = async (data: CreateTreasuryBookProps) => {
  try {
    return await prisma.treasuryBook.create({
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in TreasuryBook DAO: createTreasuryBook',
      error: parsePrismaError(e),
    })

    throw e
  }
}
