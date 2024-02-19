import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category } from '@prisma/client'

export type CreateCategoryProps = Omit<
  Category,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export const createCategory = async (data: CreateCategoryProps) => {
  try {
    return await prisma.category.create({
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Category DAO: createCategory',
      error: parsePrismaError(e),
    })

    throw e
  }
}
