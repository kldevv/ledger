import prisma from "@/db/prisma/client"
import { EntryDao } from "../.."

export namespace CreateOne {
  export type Args = {
    /**
     * Accrual date
     */
    accrualDate: Date
    /**
     * Transaction note
     */
    note: string
    /**
     * Vault id
     */
    vaultId: string
    /**
     * List of tag ids to connect to
     */
    tagIds: string[]
    /**
     * List of entries of the transaction
     */
    entries: Omit<EntryDao.CreateOne.Args, 'transactionId'>[]
  }
}

export const createOne = async ({
  accrualDate,
  vaultId,
  tagIds,
  note,
  entries,
}: CreateOne.Args) => {
  try {
    return await prisma.transaction.create({
      data: {
        accrualDate,
        vaultId,
        note,
        tags: {
          connect: tagIds.map((id) => ({ id }))
        },
        entries: {
          createMany: {
            data: entries
          }
        }
      },
      include: { tags: true, entries: {
        include: {
          account: {
            include: {
              category: true
            }
          }
        }
      }}
    })
  } catch (e) {
    throw e
  }
}