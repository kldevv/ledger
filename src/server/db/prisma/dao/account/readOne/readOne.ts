import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account } from '@prisma/client'

export type ReadOneProps = Pick<Account, 'id'>

export const readOne = async (where: ReadOneProps) => {
  try {
    return await prisma.account.findUnique({
      where,
      include: {
        category: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Account DAO: readOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
