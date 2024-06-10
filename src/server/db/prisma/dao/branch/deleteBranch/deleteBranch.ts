import prisma from '../../../client'
import { createMutation } from '../../../utils'

export interface DeleteBranchArgs {
  /**
   * Branch id
   */
  id: string
}

export const deleteBranch = createMutation({
  mutation: async ({ id }: DeleteBranchArgs) => {
    return await prisma.branch.delete({
      where: { id },
    })
  },
  name: 'deleteBranch',
})
