import prisma from '@/server/db/prisma/client'

export interface FindAccountArgs {
  /**
   * Account id
   */
  id: string
}

export const findAccount = async ({ id }: FindAccountArgs) => {
  return await prisma.account.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      accountGroup: true,
      _count: {
        select: {
          entries: true,
        },
      },
    },
  })
}
