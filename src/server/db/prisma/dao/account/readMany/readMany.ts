import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account } from '@prisma/client'

export type ReadManyProps = Partial<
  Pick<Account, 'name' | 'categoryId' | 'vaultId'>
>

export const readMany = async (where: ReadManyProps) => {
  try {
    return await prisma.account.findMany({
      where,
      include: {
        category: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Account DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
