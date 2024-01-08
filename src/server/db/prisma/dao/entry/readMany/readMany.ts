import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Account, Category, Entry } from '@prisma/client'

export type ReadManyProps = Partial<
  Omit<Entry, 'createdDate' | 'updatedDate' | 'amount' | 'memo'> &
    Pick<Account, 'categoryId'> &
    Pick<Category, 'type'>
>

export const readMany = async ({
  categoryId,
  type,
  ...props
}: ReadManyProps) => {
  try {
    return await prisma.entry.findMany({
      where: {
        ...props,
        account: {
          categoryId,
          category: {
            type,
          },
        },
      },
      include: {
        account: {
          include: {
            category: true,
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
