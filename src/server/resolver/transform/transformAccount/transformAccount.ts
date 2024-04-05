import { transformAccountGroup } from '../transformAccountGroup/transformAccountGroup'

import type { Account } from '@/api/graphql'
import type { Category, Account as PrismaAccount } from '@prisma/client'

type TransformAccountArgs = PrismaAccount & {
  /**
   * Relation field: account group
   */
  category: Category
  /**
   * Aggregate relation field: count
   */
  _count: {
    entries: number
  }
}

export const transformAccount = ({
  treasuryBookId,
  category,
  _count,
  ...rest
}: TransformAccountArgs): Account => ({
  ...rest,
  group: transformAccountGroup(category),
  count: _count.entries,
  branchId: treasuryBookId,
})
