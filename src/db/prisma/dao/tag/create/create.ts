import prisma from "@/db/prisma/client"
import { Tag } from "@prisma/client"

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

  export type Returns = Tag
}

export const createOne = async ({
  name,
  vaultId
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.tag.create({
      data: {
        name,
        vaultId
      }
    })
  } catch (e) {
    throw e
  }
}