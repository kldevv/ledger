import prisma from '@/server/db/prisma/client'

export interface FindAccountArgs {
  /**
   * Account id
   */
  id: string
}

export const findAccount = async ({ id }: FindAccountArgs) => {
  return await prisma.account.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      _count: {
        select: {
          entries: true,
        },
      },
    },
  })
}
