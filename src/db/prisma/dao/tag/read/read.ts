import prisma from "@/db/prisma/client"
import { Tag } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Tag id
     */
    id: string
  }

  export type Returns = Tag | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.tag.findUnique({
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
     * Tag name
     */
    name?: string
    /**
     * Wallet id
     */
    walletId?: string
  }

  export type Returns = Tag[]
}

export const readMany = async ({
  name,
  walletId
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.tag.findMany({
      where: {
        name,
        walletId
      }
    })
  } catch (e) {
    throw e
  }
}