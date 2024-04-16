import prisma from '../../../client'

import type { AccountingType } from '@/api/graphql'

export interface UpdateAccountGroupArgs {
  /**
   * Account group id
   */
  id: string
  /**
   * Account group name
   */
  name: string
  /**
   * Accounting type
   */
  type: AccountingType
}

export const updateAccountGroup = async ({
  id,
  name,
  type,
}: UpdateAccountGroupArgs) => {
  return await prisma.accountGroup.update({
    where: {
      id,
    },
    data: {
      name,
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
