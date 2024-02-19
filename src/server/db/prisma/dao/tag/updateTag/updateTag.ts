import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type UpdateTagProps = Pick<Tag, 'id'> & {
  /**
   * Data
   */
  data: Pick<Tag, 'name'>
}

export const updateTag = async ({ id, data }: UpdateTagProps) => {
  try {
    return await prisma.tag.update({
      where: {
        id,
      },
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
      message: 'Error in Tag DAO: updateTag',
      error: parsePrismaError(e),
    })

    throw e
  }
}
