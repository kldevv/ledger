import prisma from "@/db/prisma/client"
import { Tag } from "@prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Tag id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    // return await prisma.tag.findUnique({
    //   where: {
    //     id
    //   }
    // })
    return {
      name: 'Hawaii',
      vaultId: '00',
      id: '100',
      createdDate: new Date(),
      updatedDate: new Date(),
    }
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
     * Vault id
     */
    vaultId?: string
  }

  export type Returns = Tag[]
}

export const readMany = async ({
  name,
  vaultId
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return [
      {
        name: '1',
        vaultId: '00',
        id: '1',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        name: '99',
        vaultId: '00',
        id: '3',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        name: '4',
        vaultId: '00',
        id: '2',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ]
    // return await prisma.tag.findMany({
    //   where: {
    //     name,
    //     vaultId
    //   }
    // })
  } catch (e) {
    throw e
  }
}