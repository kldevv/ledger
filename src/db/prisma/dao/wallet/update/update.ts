import prisma from "@/db/prisma/client"
import { Currency, Wallet } from "@prisma/client"

export namespace UpdateOne {
  export type Args = {
    /**
     * Wallet id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New wallet name
     */
    name?: string
    /**
     * New wallet currency
     */
    currency?: Currency
    /**
     * New owner id
     */
    ownerId?: string
  }

  export type Returns = Wallet
}

export const updateOne = async ({ id, data }: UpdateOne.Args): Promise<UpdateOne.Returns> => {
  try {
    return await prisma.wallet.update({
      where: {
        id
      },
      data,
    })
  } catch (e) {
    throw e
  }
}