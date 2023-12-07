import prisma from "@/db/prisma/client"
import { Account } from "@prisma/client"

export namespace DeleteOne {
  export type Args = {
    /**
     * Account id
     */
    id: string
  }

  export type Returns = Account
}

export const deleteOne = async ({ id }: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    return await prisma.account.delete({
      where: {
        id,
      }
    })
  } catch (e) {
    throw e
  }
}