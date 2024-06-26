import prisma from '@/server/db/prisma/client'

export interface FindEntriesArgs {
  /**
   * Branch id
   */
  branchId?: string
  /**
   * Account id
   */
  accountId?: string
  /**
   * Journal id
   */
  journalId?: string
  /**
   * Account group id
   */
  accountGroupId?: string
}

export const findEntries = async ({
  branchId,
  accountGroupId,
  accountId,
  journalId,
}: FindEntriesArgs) => {
  return await prisma.entry.findMany({
    where: {
      accountId,
      journalId,
      branchId,
      account: {
        accountGroupId,
      },
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
    orderBy: {
      createdAt: 'desc',
    },
  })
}
