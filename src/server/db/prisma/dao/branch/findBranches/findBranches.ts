import prisma from '../../../client'

export interface FindBranchesArgs {
  /**
   * User id
   */
  userId: string
}

export const findBranches = async ({ userId }: FindBranchesArgs) => {
  return await prisma.treasuryBook.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
