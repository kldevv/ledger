import prisma from "@/db/prisma/client"
import { Wallet } from "@prisma/client"

export namespace DeleteOne {
  export type Args = {
    /**
     * Wallet id
     */
    id: string
  }

  export type Returns = Wallet
}

export const deleteOne = async ({ id }: DeleteOne.Args) => {
  try {
    return await prisma.wallet.delete({
      where: {
        id,
      }
    })
  } catch (e) {
    throw e
  }
}