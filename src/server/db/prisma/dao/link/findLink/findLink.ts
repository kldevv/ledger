import prisma from '@/server/db/prisma/client'

export interface FindLinkArgs {
  /**
   * Link id
   */
  id: string
}

export const findLink = async (where: FindLinkArgs) => {
  return await prisma.link.findUnique({
    where,
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  })
}
