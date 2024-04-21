import prisma from '@/server/db/prisma/client'

export interface FindUserArgs {
  /**
   * User id
   */
  id: string
}

export const findUser = async (where: FindUserArgs) => {
  return await prisma.user.findUniqueOrThrow({
    where,
    include: {
      accounts: {
        select: {
          provider: true,
          type: true,
        },
      },
    },
  })
}
