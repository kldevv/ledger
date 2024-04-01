import prisma from '@/server/db/prisma/client'

export interface FindBranchArgs {
  /**
   * Branch id
   */
  id: string
}

export const findBranch = async ({ id }: FindBranchArgs) => {
  return await prisma.treasuryBook.findUnique({
    where: {
      id,
    },
  })
}
