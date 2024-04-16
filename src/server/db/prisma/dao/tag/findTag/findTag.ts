import prisma from '@/server/db/prisma/client'

export interface FindTagArgs {
  /**
   * Tag id
   */
  id: string
}

export const findTag = async ({ id }: FindTagArgs) => {
  return await prisma.tag.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          journals: true,
        },
      },
    },
  })
}
