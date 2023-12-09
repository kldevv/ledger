import prisma from "@/db/prisma/client"
import { Vault } from "@prisma/client"

export namespace DeleteOne {
  export type Args = {
    /**
     * Vault id
     */
    id: string
  }

  export type Returns = Vault
}

export const deleteOne = async ({ id }: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    return await prisma.vault.delete({
      where: {
        id,
      }
    })
  } catch (e) {
    throw e
  }
}