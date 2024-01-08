import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type ReadOneProps = Pick<Tag, 'id'>

export const readOne = async (where: ReadOneProps) => {
  try {
    return await prisma.tag.findUnique({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Tag DAO: readOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
