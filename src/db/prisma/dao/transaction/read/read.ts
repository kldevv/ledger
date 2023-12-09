import prisma from "@/db/prisma/client"
import { TransactionWithDetail } from "../type"

export namespace ReadOne {
  export type Args = {
    /**
     * Transactio id
     */
    id: string
  }

  export type Returns = TransactionWithDetail | null
}

export const readOne = async ({ id }: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.transaction.findUnique({
      where: {
        id
      },
      include: { tags: true, entries: true }
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
     * Transaction subject
     */
    subject?: string
    /**
     * Transaction description
     */
    description?: string
    /**
     * Vault id
     */
    vaultId?: string
  }

  export type Returns = TransactionWithDetail[]
}

export const readMany = async ({
  accrualDate,
  vaultId,
  subject,
  description
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.transaction.findMany({
      where: {
        accrualDate,
        vaultId,
        subject,
        description
      },
      include: { tags: true, entries: true }
    })
  } catch (e) {
    throw e
  }
}

// TODO: Support query by Tag and Entry
// TODO: Support pagination