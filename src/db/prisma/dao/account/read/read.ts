import prisma from "@/db/prisma/client"
import { Account } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Account id
     */
    id: string
  }

  export type Returns = Account | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.account.findUnique({
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
     * Account name
     */
    name?: string
    /**
     * Category id
     */
    categoryId?: string
  }

  export type Returns = Account[]
}

export const readMany = async ({
  name,
  categoryId
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.account.findMany({
      where: {
        name,
        categoryId
      }
    })
  } catch (e) {
    throw e
  }
}