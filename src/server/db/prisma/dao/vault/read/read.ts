import prisma from '@/server/db/prisma/client'
import { Currency, Vault } from '@prisma/client'

export namespace ReadOne {
  export type Args = {
    /**
     * Vault id
     */
    id: string
  }

  export type Returns = Vault | null
}

export const readOne = async ({
  id,
}: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.vault.findUnique({
      where: {
        id,
      },
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Vault name
     */
    name?: string
    /**
     * Vault owener id
     */
    ownerId?: string
    /**
     * Vault currency
     */
    currency?: Currency
  }
}

export const readMany = async ({ name, ownerId, currency }: ReadMany.Args) => {
  try {
    return await prisma.vault.findMany({
      where: {
        name,
        ownerId,
        currency,
      },
    })
  } catch (e) {
    throw e
  }
}
