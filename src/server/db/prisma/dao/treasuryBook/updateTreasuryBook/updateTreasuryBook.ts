import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'
import type { Pick } from '@prisma/client/runtime/library'

export type UpdateTreasuryBookProps = Pick<TreasuryBook, 'id'> & {
  /**
   * Update data
   */
  data: Partial<Pick<TreasuryBook, 'name' | 'currency'>>
}

export const updateTreasuryBook = async ({
  id,
  data,
}: UpdateTreasuryBookProps) => {
  try {
    return await prisma.treasuryBook.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in TreasuryBook DAO: updateTreasuryBook',
      error: parsePrismaError(e),
    })

    throw e
  }
}
