import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account } from '@prisma/client'

export type UpdateOneProps = Pick<Account, 'id'> & {
  /**
   * Update data
   */
  data: Partial<Pick<Account, 'name' | 'categoryId'>>
}

export const updateOne = async ({ id, data }: UpdateOneProps) => {
  try {
    return await prisma.account.update({
      where: {
        id,
      },
      data,
      include: {
        category: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Account DAO: updateOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
