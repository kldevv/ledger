import prisma from '../../../client'
import { createMutation } from '../../../utils'

export interface HardDeleteBranchArgs {
  /**
   * Branch id
   */
  id: string
}

export const hardDeleteBranch = createMutation({
  mutation: async ({ id }: HardDeleteBranchArgs) => {
    return await prisma.branch.delete({
      where: { id },
    })
  },
  name: 'hardDeleteBranch',
})
