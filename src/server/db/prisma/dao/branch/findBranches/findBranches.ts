import prisma from '../../../client'

export interface FindBranchesArgs {
  /**
   * User id
   */
  userId: string
  /**
   * Active branch
   */
  active: boolean
}

export const findBranches = async ({ userId, active }: FindBranchesArgs) => {
  return await prisma.branch.findMany({
    where: {
      userId,
      deletedAt: active
        ? null
        : {
            not: null,
          },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
