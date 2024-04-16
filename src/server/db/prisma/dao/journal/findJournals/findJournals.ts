import prisma from '@/server/db/prisma/client'

export interface FindJournalsArgs {
  /**
   * Branch id
   */
  branchId?: string
  /**
   * Tag id
   */
  tagId?: string
  /**
   * Link id
   */
  linkId?: string
  /**
   * Account group id
   */
  accountGroupId?: string
}

export const findJournals = async ({
  branchId,
  tagId,
  linkId,
  accountGroupId,
}: FindJournalsArgs) => {
  return await prisma.journal.findMany({
    where: {
      branchId,
      links: linkId != null ? { some: { id: linkId } } : undefined,
      tags: tagId != null ? { some: { id: tagId } } : undefined,
      entries:
        accountGroupId != null
          ? {
              some: {
                account: {
                  accountGroupId,
                },
              },
            }
          : undefined,
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
    orderBy: {
      createdAt: 'desc',
    },
  })
}
