import prisma from '../../../client'

export interface FindBranchesArgs {
  /**
   * User id
   */
  userId: string
}

export const findBranches = async ({ userId }: FindBranchesArgs) => {
  return await prisma.branch.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
