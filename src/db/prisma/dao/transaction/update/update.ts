import prisma from "@/db/prisma/client"
import { CreateOne } from ".."
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

  export type Data = Partial<Omit<CreateOne.Args, 'entries'>> & {
    entries?: Omit<EntryDao.CreateOne.Args, 'transactionId'>[]
  }
}

export const updateOne = async ({ id, data: {
  entries,
  tagIds,
  ...rest
}}: UpdateOne.Args) => {
  try {
    return await prisma.transaction.update({
      where:{
        id
      },
      data: {
        ...rest,
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