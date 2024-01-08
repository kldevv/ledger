import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Vault } from '@prisma/client'
import type { Pick } from '@prisma/client/runtime/library'

export type UpdateOneProps = Pick<Vault, 'id'> & {
  /**
   * Update data
   */
  data: Data
}

type Data = Partial<Pick<Vault, 'name'>>

export const updateOne = async ({ id, data }: UpdateOneProps) => {
  try {
    return await prisma.vault.update({
      where: {
        id,
      },
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
