import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type FindTagProps = Pick<Tag, 'id'>

export const findTag = async (where: FindTagProps) => {
  try {
    return await prisma.tag.findUnique({
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
      message: 'Error in Tag DAO: findTag',
      error: parsePrismaError(e),
    })

    throw e
  }
}
