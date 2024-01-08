import prisma from '@/server/db/prisma/client'
import { CategoryType } from '@prisma/client'

export namespace CreateOne {
  export type Args = {
    /**
     * Account name
     */
    name: string
    /**
     * Category id
     */
    categoryId: string
    /**
     * Vault id
     */
    vaultId: string
  }
}

export const createOne = async ({
  name,
  categoryId,
  vaultId,
}: CreateOne.Args) => {
  try {
    return await prisma.account.create({
      data: {
        name,
        categoryId,
        vaultId,
      },
      include: {
        category: true,
      },
    })
  } catch (e) {
    throw e
  }
}
