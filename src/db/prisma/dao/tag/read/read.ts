import prisma from "@/db/prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Tag id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return await prisma.tag.findUnique({
      where: {
        id
      }
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Tag name
     */
    name?: string
    /**
     * Vault id
     */
    vaultId?: string
  }
}

export const readMany = async ({
  name,
  vaultId
}: ReadMany.Args) => {
  try {
    return await prisma.tag.findMany({
      where: {
        name,
        vaultId
      }
    })
  } catch (e) {
    throw e
  }
}