import prisma from '@/server/db/prisma/client'

export namespace CreateOne {
  export type Args = {
    /**
     * Account name
     */
    name: string
    /**
     * Vault id
     */
    vaultId: string
  }
}

export const createOne = async ({ name, vaultId }: CreateOne.Args) => {
  try {
    return await prisma.tag.create({
      data: {
        name,
        vaultId,
      },
    })
  } catch (e) {
    throw e
  }
}
