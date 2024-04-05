import prisma from '@/server/db/prisma/client'

export interface FindEntryArgs {
  /**
   * Entry id
   */
  id: string
}

export const findEntry = async ({ id }: FindEntryArgs) => {
  return await prisma.entry.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      treasuryBook: {
        select: {
          currency: true,
        },
      },
      transaction: {
        select: {
          note: true,
          accrualDate: true,
        },
      },
      account: {
        select: {
          name: true,
        },
      },
    },
  })
}
