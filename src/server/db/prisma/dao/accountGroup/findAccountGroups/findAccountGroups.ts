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
  return await prisma.category.findMany({
    where: {
      treasuryBookId: branchId,
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
