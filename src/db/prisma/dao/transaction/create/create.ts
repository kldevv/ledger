import prisma from "@/db/prisma/client"
import { EntryDao } from "../.."
import { TransactionWithDetail } from "../type"

export namespace CreateOne {
  export type Args = {
    /**
     * Accrual date
     */
    accrualDate: Date
    /**
     * Transaction description
     */
    description: string
    /**
     * Wallet id
     */
    walletId: string
    /**
     * List of tag ids to connect to
     */
    tagIds: string[]
    /**
     * List of entries of the transaction
     */
    entries: EntryDao.CreateOne.Args[]
  }

  export type Returns = TransactionWithDetail
}

export const createOne = async ({
  accrualDate,
  description,
  walletId,
  tagIds,
  entries
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.transaction.create({
      data: {
        accrualDate,
        description,
        walletId,
        tags: {
          connect: tagIds.map((id) => ({ id }))
        },
        entries: {
          createMany: {
            data: entries
          }
        }
      },
      include: { tags: true, entries: true}
    })
  } catch (e) {
    throw e
  }
}