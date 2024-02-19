import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account } from '@prisma/client'

export type FindAccountProps = Pick<Account, 'id'>

export const findAccount = async (where: FindAccountProps) => {
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
      message: 'Error in Account DAO: findAccount',
      error: parsePrismaError(e),
    })

    throw e
  }
}
