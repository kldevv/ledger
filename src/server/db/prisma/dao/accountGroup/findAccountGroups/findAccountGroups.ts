import prisma from '../../../client'

export interface FindAccountGroupsArgs {
  /**
   * Branch id
   */
  branchId: string
}

export const findAccountGroups = async ({
  branchId,
}: FindAccountGroupsArgs) => {
  return await prisma.accountGroup.findMany({
    where: {
      branchId,
    },
    include: {
      _count: {
        select: {
          accounts: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
