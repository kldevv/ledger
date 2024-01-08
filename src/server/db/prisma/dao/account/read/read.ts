import prisma from '@/server/db/prisma/client/client'

export namespace ReadOne {
  export type Args = {
    /**
     * Account id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return await prisma.account.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Account name
     */
    name?: string
    /**
     * Category id
     */
    categoryId?: string
    /**
     * Vault id
     */
    vaultId?: string
  }
}

export const readMany = async ({
  name,
  categoryId,
  vaultId,
}: ReadMany.Args) => {
  try {
    return await prisma.account.findMany({
      where: {
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
