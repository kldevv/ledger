import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { TreasuryBook } from '@prisma/client'
import type { Pick } from '@prisma/client/runtime/library'

export type UpdateOneProps = Pick<TreasuryBook, 'id'> & {
  /**
   * Update data
   */
  data: Data
}

type Data = Partial<Pick<TreasuryBook, 'name'>>

export const updateOne = async ({ id, data }: UpdateOneProps) => {
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
      message: 'Error in TreasuryBook DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
