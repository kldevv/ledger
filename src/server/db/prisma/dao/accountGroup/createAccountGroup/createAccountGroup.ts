import prisma from '../../../client'

import type { AccountingType } from '@/api/graphql'

export interface CreateAccountGroupArgs {
  /**
   * Branch id
   */
  branchId: string
  /**
   * Account group name
   */
  name: string
  /**
   * Accounting type
   */
  type: AccountingType
}

export const createAccountGroup = async ({
  branchId,
  name,
  type,
}: CreateAccountGroupArgs) => {
  return await prisma.accountGroup.create({
    data: {
      name,
      branchId,
      type,
    },
    include: {
      _count: {
        select: {
          accounts: true,
        },
      },
    },
  })
}
