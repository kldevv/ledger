import prisma from "@/db/prisma/client"
import { Currency, Vault } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Vault id
     */
    id: string
  }

  export type Returns = Vault | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.vault.findUnique({
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
     * Vault name
     */
    name?: string
    /**
     * Vault owener id
     */
    ownerId?: string
    /**
     * Vault currency
     */
    currency?: Currency
  }

  export type Returns = Vault[]
}

export const readMany = async ({ name, ownerId, currency }: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return [{
      id: '77',
      name: 'USD Vault',
      ownerId: ownerId ?? '000',
      currency: 'USD',
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }, {
      id: '88',
      name: 'NTD Vault',
      ownerId: ownerId ?? '000',
      currency: 'NTD',
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }, {
      id: '100',
      name: 'USD Vault 2',
      ownerId: ownerId ?? '000',
      currency: 'USD',
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
    }]

  } catch (e) {
    throw e
  }
}