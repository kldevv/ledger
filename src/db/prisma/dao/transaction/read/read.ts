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
    const tags = [
      {
        name: 'Super longlonglonglonglonglonglonglonglong name',
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
      {
        name: 'Groceries',
        vaultId: '00',
        id: '3',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        name: 'Food',
        vaultId: '00',
        id: '4',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        name: 'Denver',
        vaultId: '00',
        id: '6',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        name: 'Hawaii',
        vaultId: '00',
        id: '100',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ]
    
    return {
      id,
      note: 'Some random note',
      tags,
      accrualDate: new Date(),
      createdDate: new Date(),
      updatedDate: new Date(),
      vaultId: '111',
    }
    // return await prisma.transaction.findUnique({
    //   where: {
    //     id
    //   },
    //   include: {
    //     tags: true
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