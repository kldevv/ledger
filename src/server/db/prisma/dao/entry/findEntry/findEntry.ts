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
      branch: {
        select: {
          currency: true,
        },
      },
      journal: {
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
