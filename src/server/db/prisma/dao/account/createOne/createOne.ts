import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account } from '@prisma/client'

export type CreateOneProps = Omit<
  Account,
  'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
>

export const createOne = async (data: CreateOneProps) => {
  try {
    return await prisma.account.create({
      data,
      include: {
        category: true,
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Account DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
