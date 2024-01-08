import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Vault } from '@prisma/client'

export type CreateOneProps = Pick<Vault, 'name' | 'currency' | 'ownerId'>

export const createOne = async (data: CreateOneProps) => {
  try {
    return await prisma.vault.create({
      data,
    })
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Vault DAO: createOne',
      error: parsePrismaError(e),
    })

    throw e
  }
}