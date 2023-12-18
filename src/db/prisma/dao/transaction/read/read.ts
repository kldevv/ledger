import prisma from "@/db/prisma/client"
import { CategoryType, EntryStatus } from "@prisma/client"

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
    return [
      {
        id: '0001',
        accrualDate: new Date(Date.now()),
        note: 'Buy a Ferrari',
        tags: [],
        vaultId,
        createdDate: new Date(),
        updatedDate: new Date(),
        entries: [
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
              id: '0',
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
      },
      {
        id: '0002',
        accrualDate: new Date(Date.now()),
        note: 'A very very very very very very very very long description',
        tags: tags,
        vaultId,
        createdDate: new Date(),
        updatedDate: new Date(),
        entries: [
          {
            id: '0',
            transactionDate: new Date(Date.now()),
            debit: 100.4,
            credit: 200.32,
            memo: 'hello mom',
            transactionId: '0',
            status: EntryStatus.PENDING,
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
                type: CategoryType.ASSETS,
                vaultId: '111',
                createdDate: new Date(),
                updatedDate: new Date(),
              }
            }
          }
        ]
      },
      {
        id: '0003',
        accrualDate: new Date(Date.now()),
        note: 'Another trans',
        tags: tags,
        vaultId,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '0004',
        accrualDate: new Date(Date.now()),
        note: 'One tags',
        tags: [tags[0]],
        vaultId,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ];
    // return await prisma.transaction.findMany({
    //   where: {
    //     accrualDate,
    //     vaultId,
    //     note,
    //     tags: {
    //       some: {
    //         id: tagId
    //       }
    //     }
    //   },
    //   include: {
    //     tags: true, entries: {
    //       include: {
    //         account: true
    //       }
    //     }
    //   }
    // })
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