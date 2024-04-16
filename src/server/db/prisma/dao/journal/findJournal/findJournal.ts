import prisma from '@/server/db/prisma/client'

export interface FindJournalArgs {
  /**
   * Journal id
   */
  id: string
}

export const findJournal = async ({ id }: FindJournalArgs) => {
  return await prisma.journal.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      links: {
        select: {
          id: true,
          name: true,
        },
      },
      entries: {
        select: {
          amount: true,
          status: true,
        },
      },
      branch: {
        select: {
          currency: true,
        },
      },
    },
  })
}
