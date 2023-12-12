import prisma from "@/db/prisma/client"
import { Account } from "@prisma/client"

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

  export type Returns = Account
}

export const createOne = async ({
  name,
  categoryId,
  vaultId
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.account.create({
      data: {
        name,
        categoryId,
        vaultId,
      }
    })
  } catch (e) {
    throw e
  }
}