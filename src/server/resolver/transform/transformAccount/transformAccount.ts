import { transformAccountGroup } from '../transformAccountGroup/transformAccountGroup'

import type { Account } from '@/api/graphql'
import type { AccountGroup, Account as PrismaAccount } from '@prisma/client'

type TransformAccountArgs = PrismaAccount & {
  /**
   * Relation field: account group
   */
  accountGroup: AccountGroup
  /**
   * Aggregate relation field: count
   */
  _count: {
    entries: number
  }
}

export const transformAccount = ({
  accountGroup,
  _count,
  ...rest
}: TransformAccountArgs): Account => ({
  ...rest,
  group: transformAccountGroup(accountGroup),
  count: _count.entries,
})
