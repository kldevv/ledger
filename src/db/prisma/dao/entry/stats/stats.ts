import prisma from "@/db/prisma/client"
import { Entry } from "@prisma/client"

export namespace ReadMinMaxTransactionDate {
  export type Args = Pick<Entry, 'vaultId'>
}

export const readMinMaxTransactionDate = async ({ vaultId }: ReadMinMaxTransactionDate.Args) => {
  try {
    return await prisma.entry.aggregate({
      where: {
        vaultId
      },
      _min: {
        transactionDate: true
      },
      _max: {
        transactionDate: true
      }
    })
  } catch (e) {

  }
}