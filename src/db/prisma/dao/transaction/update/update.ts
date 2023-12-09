import prisma from "@/db/prisma/client"
import { TransactionWithDetail } from "../type"
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
     * New accrual date
     */
    accrualDate?: Date
    /**
     * New transaction subject
     */
    subject: string
    /**
     * New transaction description
     */
    description?: string
    /**
     * New list of tag ids to connect to
     */
    tagIds?: string[]
    /**
     * New list of entries of the transaction
     */
    entries?: EntryDao.CreateOne.Args[]
  }

  export type Returns = TransactionWithDetail
}

export const updateOne = async ({ id, data: {
  accrualDate,
  subject,
  description, 
  tagIds,
  entries
}}: UpdateOne.Args): Promise<UpdateOne.Returns> => {
  try {
    return await prisma.transaction.update({
      where:{
        id
      },
      data: {
        accrualDate,
        subject,
        description, 
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
      include: { tags: true, entries: true }
    })
  } catch (e) {
    throw e
  }
}