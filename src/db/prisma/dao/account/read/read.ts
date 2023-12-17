import prisma from "@/db/prisma/client"
import { AccountDetail } from ".."

export namespace ReadOne {
  export type Args = {
    /**
     * Account id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return await prisma.account.findUnique({
      where: {
        id
      },
      include: {
        category: true,
        entries: true
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
    /**
     * Vault id
     */
    vaultId?: string
  }

  export type Returns = AccountDetail[]
}

export const readMany = async ({
  name,
  categoryId,
  vaultId,
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return [
      {
        name: 'Expense',
        id: '911',
        updatedDate: new Date(Date.now()),
        createdDate: new Date(Date.now()),
        vaultId: vaultId ?? '0',
        categoryId: '72',
        category: {
          id: '72',
          name: 'Master Expense',
          type: "LIABILITIES",
          vaultId: vaultId ?? '0',
          updatedDate: new Date(Date.now()),
          createdDate: new Date(Date.now()),
        }
      },
      {
        name: 'Revenue',
        id: '912',
        updatedDate: new Date(Date.now()),
        createdDate: new Date(Date.now()),
        vaultId: vaultId ?? '0',
        categoryId: '73',
        category: {
          id: '73',
          name: 'Master Revenue',
          type: "LIABILITIES",
          vaultId: vaultId ?? '0',
          updatedDate: new Date(Date.now()),
          createdDate: new Date(Date.now()),
        }
      }
    ]
    // return await prisma.account.findMany({
    //   where: {
    //     name,
    //     categoryId,
    //     vaultId,
    //   },
    //   include: {
    //     category: true
    //   }
    // })
  } catch (e) {
    throw e
  }
}