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
    return await prisma.transaction.findUnique({
      where: {
        id
      },
      include: {
        tags: true
      }
    })
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
    note?: string
    /**
     * Vault id
     */
    vaultId: string
    /**
     * Tag id
     */
    tagId?: string
  }
}

export const readMany = async ({
  accrualDate,
  vaultId,
  note,
  tagId
}: ReadMany.Args) => {
  try {
    return await prisma.transaction.findMany({
      where: {
        accrualDate,
        vaultId,
        note,
        tags: tagId ? {
          some: {
            id: tagId
          }
        } : undefined
      },
      include: {
        tags: true, entries: {
          include: {
            account: {
              include: {
                category: true
              }
            }
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