import prisma from '@/server/db/prisma/client'

export interface FindLinksArgs {
  /**
   * User id
   */
  userId: string
}

export const findLinks = async ({ userId }: FindLinksArgs) => {
  return await prisma.link.findMany({
    where: { userId },
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
