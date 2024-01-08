import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category } from '@prisma/client'

export type ReadOneProps = Pick<Category, 'id'>

export const readOne = async (where: ReadOneProps) => {
  try {
    return await prisma.category.findUnique({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Category DAO: readOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
