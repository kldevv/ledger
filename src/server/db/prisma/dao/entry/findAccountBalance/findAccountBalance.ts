import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { EntryStatus } from '@prisma/client'

export type FindAccountBalanceProps = {
  /**
   * Treasury book id
   */
  treasuryBookId: string
  /**
   * Status
   */
  status?: EntryStatus
}

export const findAccountBalance = async (props: FindAccountBalanceProps) => {
  try {
    return await prisma.entry.groupBy({
      by: ['accountId'],
      _sum: {
        amount: true,
      },
      where: props,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: findAccountBalance',
      error: parsePrismaError(e),
      args: props,
    })

    throw e
  }
}
