import prisma from '@/server/db/prisma/client'

export interface UpdateAccountArgs {
  /**
   * Account id
   */
  id: string
  /**
   * Account name
   */
  name: string
  /**
   * Account group id
   */
  accountGroupId: string
}

export const updateAccount = async ({
  id,
  name,
  accountGroupId,
}: UpdateAccountArgs) => {
  return await prisma.account.update({
    where: {
      id,
    },
    data: {
      name,
      category: {
        connect: { id: accountGroupId },
      },
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
