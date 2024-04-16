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
      branchId,
      accountGroupId,
    },
    include: {
      accountGroup: true,
      _count: {
        select: {
          entries: true,
        },
      },
    },
    orderBy: {
      accountGroup: {
        name: 'asc',
      },
    },
  })
}
