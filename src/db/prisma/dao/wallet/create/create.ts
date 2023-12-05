import prisma from "@/db/prisma/client"
import { Currency, Wallet } from "@prisma/client"

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

  export type Returns = Wallet
}

export const createOne = async ({ name, currency, ownerId }: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    console.log(name, currency, ownerId)

    return {
      createdDate: new Date(),
      updatedDate: new Date(),
      id: '123',
      ownerId: '666',
      name: 'sasda',
      currency: Currency.USD
    }
    // return await prisma.wallet.create({
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