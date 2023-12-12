import prisma from "@/db/prisma/client"

export namespace ReadOne {
  export type Args = {
    /**
     * Transactio id
     */
    id: string
  }
}

export const readOne = async ({ id }: ReadOne.Args) => {
  try {
    return {
      id,
      note: 'Some random note',
      tags: [{ id: '12', name: 'tag A' }, { id: '13', name: 'tag B' }],
      accrualDate: new Date(),
      createdDate: new Date(),
      updatedDate: new Date(),
      vaultId: '111',
      entries: [
        {
          id: '0',
          transactionDate: new Date(Date.now()),
          debit: 100.4,
          credit: 200.32,
          memo: 'hello mom',
          transactionId: '0',
          status: 'COMPLETED',
          createdDate: new Date(),
          updatedDate: new Date(),
          vaultId: '111',
          account: {
            id: '0',
            name: 'Bank account',
            createdDate: new Date(),
            updatedDate: new Date(),
            vaultId: '111',
            category: {
              id: '12',
              name: 'Some category',
              type: 'ASSETS',
              vaultId: '111',
              createdDate: new Date(),
              updatedDate: new Date(),
            }
          }
        }
      ]
    }
    // return await prisma.transaction.findUnique({
    //   where: {
    //     id
    //   },
    //   include: {
    //     tags: true, entries: {
    //       include: {
    //         account: {
    //           include: {
    //             category: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    // TODO: Support query by date range
    /**
     * Accrual date
     */
    accrualDate?: Date
    // TODO: Support query by text
    /**
     * Transaction note
     */
    note: string
    /**
     * Vault id
     */
    vaultId?: string
  }
}

export const readMany = async ({
  accrualDate,
  vaultId,
  note
}: ReadMany.Args) => {
  try {
    return await prisma.transaction.findMany({
      where: {
        accrualDate,
        vaultId,
        note
      },
      include: {
        tags: true, entries: {
          include: {
            account: true
          }
        }
      }
    })
  } catch (e) {
    throw e
  }
}

// TODO: Support query by Tag and Entry
// TODO: Support pagination