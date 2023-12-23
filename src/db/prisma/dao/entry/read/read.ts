import prisma from "@/db/prisma/client"
import { CategoryType, EntryStatus } from "@prisma/client"
import { EntryDetail } from "../type"

export namespace ReadOne {
  export type Args = {
    /**
     * Entry id
     */
    id: string
  }

  export type Returns = EntryDetail | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.entry.findUnique({
      where: {
        id
      },
      include: {
        account: {
          include: {
            category: true
          }
        }
      }
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Transaction date
     */
    transactionDate?: Date
    /**
     * Account id
     */
    accountId?: string
    /**
     * Transaction id
     */
    transactionId?: string
    /**
     * Entry status
     */
    status?: EntryStatus
    /**
     * Vault id
     */
    vaultId?: string
    /**
     * Category id
     */
    categoryId?: string
    /**
     * Category type
     */
    categoryType?: CategoryType
  }
}

export const readMany = async ({ 
  transactionDate,
  accountId,
  transactionId,
  status,
  vaultId,
  categoryId,
  categoryType,
 }: ReadMany.Args) => {
  try {
    return [
      {
        id: '0',
        transactionDate: new Date(Date.now()),
        debit: 100.4,
        credit: 200.32,
        memo: 'hello mom',
        transactionId: '0',
        status: EntryStatus.COMPLETED,
        createdDate: new Date(),
        updatedDate: new Date(),
        vaultId: '111',
        account: {
          id: '911',
          name: 'Bank account',
          createdDate: new Date(),
          updatedDate: new Date(),
          vaultId: '111',
          category: {
            id: '12',
            name: 'Some category',
            type: CategoryType.ASSETS,
            vaultId: '111',
            createdDate: new Date(),
            updatedDate: new Date(),
          }
        }
      }
    ]
    // return await prisma.entry.findMany({
    //   where: {
    //     transactionDate,
    //     accountId,
    //     transactionId,
    //     status,
    //     vaultId,
    //     account: {
    //       categoryId,
    //       category: {
    //         type: categoryType
    //       }
    //     }
    //   },
    //   include: {
    //     account: {
    //       include: {
    //         category: true
    //       }
    //     }
    //   }
    // })
  } catch (e) {
    throw e
  }
}