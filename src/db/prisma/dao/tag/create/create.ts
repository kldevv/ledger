import prisma from "@/db/prisma/client"
import { Tag } from "@prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Account name
     */
    name: string
    /**
     * Wallet id
     */
    walletId: string
  }

  export type Returns = Tag
}

export const createOne = async ({
  name,
  walletId
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.tag.create({
      data: {
        name,
        walletId
      }
    })
  } catch (e) {
    throw e
  }
}