import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type FindTagsProps = Partial<Pick<Tag, 'treasuryBookId' | 'type'>>

export const findTags = async (where: FindTagsProps) => {
  try {
    return await prisma.tag.findMany({
      where,
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
      message: 'Error in Tag DAO: findTags',
      error: parsePrismaError(e),
    })

    throw e
  }
}
