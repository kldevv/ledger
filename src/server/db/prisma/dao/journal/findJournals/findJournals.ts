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
  return await prisma.transaction.findMany({
    where: {
      treasuryBookId: branchId,
      links: linkId != null ? { some: { id: linkId } } : undefined,
      tags: tagId != null ? { some: { id: tagId } } : undefined,
      entries:
        accountGroupId != null
          ? {
              some: {
                account: {
                  categoryId: accountGroupId,
                },
              },
            }
          : undefined,
    },
    include: {
      tags: true,
      entries: {
        select: {
          amount: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
