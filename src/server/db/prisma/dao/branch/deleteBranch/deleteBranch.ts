import prisma from '../../../client'
import { createMutation } from '../../../utils'

export interface DeleteBranchArgs {
  /**
   * Branch id
   */
  id: string
  /**
   * User id
   */
  userId: string
}

export const deleteBranch = createMutation({
  mutation: async ({ id, userId }: DeleteBranchArgs) => {
    return await prisma.branch.update({
      where: { id, userId },
      data: {
        deletedAt: new Date(),
      },
    })
  },
  name: 'deleteBranch',
})
