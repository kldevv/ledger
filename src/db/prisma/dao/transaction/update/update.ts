import prisma from "@/db/prisma/client"
import { EntryDao } from "../.."

export namespace UpdateOne {
  export type Args = {
    /**
     * Transaction id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New transaction note
     */
    note?: string
    /**
     * New accrual date
     */
    accrualDate?: Date
    /**
     * New list of tag ids to connect to
     */
    tagIds?: string[]
    /**
     * New list of entries of the transaction
     */
    entries?: Omit<EntryDao.CreateOne.Args, 'transactionId'>[]
  }
}

export const updateOne = async ({ id, data: {
  accrualDate,
  note,
  tagIds,
  entries
}}: UpdateOne.Args) => {
  try {
    return await prisma.transaction.update({
      where:{
        id
      },
      data: {
        accrualDate,
        note, 
        tags: tagIds ? {
          set: [],
          connect: tagIds.map((id) => ({ id }))
        } : undefined,
        entries: entries ? {
          deleteMany: {},
          createMany: {
            data: entries
          }
        } : undefined
      },
      include: { tags: true, entries: {
        include: {
          account: {
            include: {
              category: true
            }
          }
        }
      } }
    })
  } catch (e) {
    throw e
  }
}