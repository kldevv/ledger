import prisma from "@/db/prisma/client"
import { Currency, Vault } from "@prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Vault name
     */
    name: string
    /**
     * Vault currency
     */
    currency: Currency
    /**
     * Vault owner id
     */
    ownerId: string
  }
}

export const createOne = async ({ name, currency, ownerId }: CreateOne.Args) => {
  try {
    return {
      id: '000',
      name,
      currency,
      ownerId,
      createdDate: new Date(),
      updatedDate: new Date()
    }
    // return await prisma.vault.create({
    //   data: {
    //     name,
    //     currency,
    //     ownerId
    //   },
    // })
  } catch (e) {
    throw e
  }
}