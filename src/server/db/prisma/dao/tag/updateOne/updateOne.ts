import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type UpdateOneProps = Pick<Tag, 'id'> & {
  /**
   * Data
   */
  data: Pick<Tag, 'name'>
}

export const updateOne = async ({ id, data }: UpdateOneProps) => {
  try {
    return await prisma.tag.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Tag DAO: updateOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
