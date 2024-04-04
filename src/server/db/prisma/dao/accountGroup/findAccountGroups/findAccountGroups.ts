import prisma from '../../../client'

export interface FindBranchesArgs {
  /**
   * Branch id
   */
  branchId: string
}

export const findAccountGroups = async ({ branchId }: FindBranchesArgs) => {
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
