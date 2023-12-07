import prisma from "@/db/prisma/client"
import { TransactionWithDetail } from "../type"


export namespace DeleteOne {
  export type Args = {
    /**
     * Transaction id
     */
    id: string
  }

  export type Returns = TransactionWithDetail
}

export const deleteOne = async ({ id }: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    // TODO: Delete relational tag before deleting the transaction
    return await prisma.transaction.delete({
      where: {
        id,
      },
      include: { tags: true, entries: true }
    })
  } catch (e) {
    throw e
  }
}