import prisma from "@/db/prisma/client"
import { Currency, Wallet } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Wallet id
     */
    id: string
  }

  export type Returns = Wallet | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.wallet.findUnique({
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
     * Wallet name
     */
    name?: string
    /**
     * Wallet owener id
     */
    ownerId?: string
    /**
     * Wallet currency
     */
    currency?: Currency
  }

  export type Returns = Wallet[]
}

export const readMany = async ({ name, ownerId, currency }: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return [{
      name: '456',
      id: '555',
      ownerId: '123',
      currency: Currency.USD,
      createdDate: new Date(),
      updatedDate: new Date()
    }, {
        name: '1212312313',
        id: '33',
        ownerId: '123',
        currency: Currency.USD,
        createdDate: new Date(),
        updatedDate: new Date()
      }]
    // return await prisma.wallet.findMany({
    //   where: {
    //     name,
    //     ownerId,
    //     currency
    //   }
    // })
  } catch (e) {
    throw e
  }
}