import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Tag } from '@prisma/client'

export type ReadManyProps = Pick<Tag, 'treasuryBookId'>

export const readMany = async (where: ReadManyProps) => {
  try {
    return await prisma.tag.findMany({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Tag DAO: readMany',
      error: parsePrismaError(e),
    })

    throw e
  }
}
