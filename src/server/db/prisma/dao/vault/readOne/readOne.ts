import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Vault } from '@prisma/client'

export type ReadOneProps = Pick<Vault, 'id'>

export const readOne = async (where: ReadOneProps) => {
  try {
    return await prisma.vault.findUnique({
      where,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Vault DAO: readOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}