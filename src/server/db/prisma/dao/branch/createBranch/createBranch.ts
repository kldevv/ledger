import prisma from '../../../client'

import type { Currency } from '@prisma/client'

export interface CreateBranchArgs {
  /**
   * Branch user id
   */
  userId: string
  /**
   * Branch name
   */
  name: string
  /**
   * Branch currency
   */
  currency: Currency
}

export const createBranch = async ({ userId, ...rest }: CreateBranchArgs) => {
  return await prisma.treasuryBook.create({
    data: {
      ...rest,
      ownerId: userId,
    },
  })
}
