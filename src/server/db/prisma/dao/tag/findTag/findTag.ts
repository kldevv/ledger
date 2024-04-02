import prisma from '@/server/db/prisma/client'

export interface FindTagArgs {
  /**
   * Tag id
   */
  id: string
}

export const findTag = async ({ id }: FindTagArgs) => {
  return await prisma.tag.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  })
}
