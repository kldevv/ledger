import prisma from '@/server/db/prisma/client'

export interface FindTagsArgs {
  /**
   * Branch id
   */
  branchId: string
}

export const findTags = async ({ branchId }: FindTagsArgs) => {
  return await prisma.tag.findMany({
    where: {
      branchId,
    },
    include: {
      _count: {
        select: {
          journals: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
