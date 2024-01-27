import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Entry } from '@prisma/client'

export type CreateOneProps = Omit<Entry, 'createdAt' | 'updatedAt' | 'id'>

export const createOne = async (data: CreateOneProps) => {
  try {
    await prisma.entry.create({
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}
