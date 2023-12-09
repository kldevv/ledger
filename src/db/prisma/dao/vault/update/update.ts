import prisma from "@/db/prisma/client"
import { Currency, Vault } from "@prisma/client"

export namespace UpdateOne {
  export type Args = {
    /**
     * Vault id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New vault name
     */
    name?: string
    /**
     * New vault currency
     */
    currency?: Currency
    /**
     * New owner id
     */
    ownerId?: string
  }

  export type Returns = Vault
}

export const updateOne = async ({ id, data }: UpdateOne.Args): Promise<UpdateOne.Returns> => {
  try {
    return await prisma.vault.update({
      where: {
        id
      },
      data,
    })
  } catch (e) {
    throw e
  }
}