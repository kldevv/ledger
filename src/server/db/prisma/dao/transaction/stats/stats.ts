import prisma from '@/server/db/prisma/client'
import { Transaction } from '@prisma/client'

export namespace ReadMinMaxAccrualDate {
  export type Args = Pick<Transaction, 'vaultId'>
}

export const readMinMaxAccrualDate = async ({
  vaultId,
}: ReadMinMaxAccrualDate.Args) => {
  try {
    return await prisma.transaction.aggregate({
      where: {
        vaultId,
      },
      _min: {
        accrualDate: true,
      },
      _max: {
        accrualDate: true,
      },
    })
  } catch (e) {}
}
