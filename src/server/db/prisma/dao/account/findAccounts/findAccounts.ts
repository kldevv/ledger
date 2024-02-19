import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account } from '@prisma/client'

export type FindAccountsProps = Partial<
  Pick<Account, 'name' | 'categoryId' | 'treasuryBookId'>
>

export const findAccounts = async (where: FindAccountsProps) => {
  try {
    return await prisma.account.findMany({
      where,
      include: {
        category: true,
        _count: {
          select: {
            entries: true,
          },
        },
      },
      orderBy: {
        category: {
          name: 'asc',
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Account DAO: findAccounts',
      error: parsePrismaError(e),
    })

    throw e
  }
}
