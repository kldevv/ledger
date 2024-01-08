import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type CreateOneProps = Omit<Tag, 'id' | 'createdDate' | 'updatedDate'>

export const createOne = async (data: CreateOneProps) => {
  try {
    return await prisma.tag.create({
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Tag DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
