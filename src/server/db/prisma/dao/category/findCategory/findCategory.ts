import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category } from '@prisma/client'

export type FindCategoryProps = Pick<Category, 'id'>

export const findCategory = async (where: FindCategoryProps) => {
  try {
    return await prisma.category.findUnique({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Category DAO: findCategory',
      error: parsePrismaError(e),
    })

    throw e
  }
}
