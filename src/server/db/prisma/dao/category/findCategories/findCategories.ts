import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category } from '@prisma/client'

export type FindCategoriesProps = Partial<
  Pick<Category, 'type' | 'treasuryBookId'>
>

export const findCategories = async (where: FindCategoriesProps) => {
  try {
    return await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: {
            accounts: true,
          },
        },
      },
      orderBy: {
        type: 'asc',
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Category DAO: findCategories',
      error: parsePrismaError(e),
    })

    throw e
  }
}
