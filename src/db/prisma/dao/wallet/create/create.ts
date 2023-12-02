import prisma from "@/db/prisma/client"
import { Currency } from "@prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Wallet name
     */
    name: string
    /**
     * Wallet currency
     */
    currency: Currency
    /**
     * Wallet owner id
     */
    ownerId: string
  }
}

export const createOne = async ({ name, currency, ownerId }: CreateOne.Args) => {
  try {
    await prisma.wallet.create({
      data: {
        name,
        currency,
        ownerId
      },
    })
  } catch (e) {
    throw e
  }
}