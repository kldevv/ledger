import prisma from '@/server/db/prisma/client'

export interface FindAccountsArgs {
  /**
   * Branch id
   */
  branchId?: string
  /**
   * Account group id
   */
  accountGroupId?: string
}

export const findAccounts = async ({
  branchId,
  accountGroupId,
}: FindAccountsArgs) => {
  return await prisma.account.findMany({
    where: {
      treasuryBookId: branchId,
      categoryId: accountGroupId,
    },
    include: {
      category: true,
      _count: {
        select: {
          entries: true,
        },
      },
    },
    orderBy: {
      category: {
        name: 'asc',
      },
    },
  })
}
