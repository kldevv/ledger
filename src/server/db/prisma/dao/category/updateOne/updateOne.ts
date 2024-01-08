import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category } from '@prisma/client'

export type UpdateOneProps = Pick<Category, 'id'> & {
  data: Pick<Category, 'type' | 'name'>
}

export const updateOne = async ({ id, data }: UpdateOneProps) => {
  try {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Category DAO: updateOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
