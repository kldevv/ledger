import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type CreateTagProps = Pick<Tag, 'name' | 'treasuryBookId' | 'type'>

export const createTag = async (data: CreateTagProps) => {
  try {
    return await prisma.tag.create({
      data,
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Tag DAO: createTag',
      error: parsePrismaError(e),
    })

    throw e
  }
}
