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
      id: '77',
      name: 'USD Wallet',
      ownerId: ownerId ?? '000',
      currency: 'USD',
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }, {
      id: '88',
      name: 'NTD Wallet',
      ownerId: ownerId ?? '000',
      currency: 'NTD',
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }, {
      id: '100',
      name: 'USD Wallet 2',
      ownerId: ownerId ?? '000',
      currency: 'USD',
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }]

  } catch (e) {
    throw e
  }
}