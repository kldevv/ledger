import prisma from '@/server/db/prisma/client'

import type { Currency } from '@prisma/client'

export interface UpdateBranchArgs {
  /**
   * Branch id
   */
  id: string
  /**
   * Updated branch name
   */
  name: string
  /**
   * Updated branch currency
   */
  currency: Currency
}

export const updateBranch = async ({
  id,
  name,
  currency,
}: UpdateBranchArgs) => {
  return await prisma.treasuryBook.update({
    where: {
      id,
    },
    data: {
      name,
      currency,
    },
  })
}
