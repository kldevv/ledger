import prisma from '@/server/db/prisma/client'
import { parsePrismaError } from '@/server/db/prisma/utils'
import logger from '@/server/logger'

import type { Vault } from '@prisma/client'

export type ReadManyProps = Pick<Vault, 'ownerId'> &
  Partial<Pick<Vault, 'currency'>>

export const readMany = async ({ ownerId, currency }: ReadManyProps) => {
  try {
    return await prisma.vault.findMany({
      where: {
        ownerId,
        currency,
      },
    })
  } catch (e: unknown) {
    logger.log({
      level: 'info',
      message: 'Error in Vault DAO: readMany',
      error: parsePrismaError(e),
    })
  }
}
