import type { AccountGroup } from '@/api/graphql'
import type { Category as PrismaAccountGroup } from '@prisma/client'

type TransformAccountGroupArgs = PrismaAccountGroup & {
  /**
   * Aggregate relation field: count
   */
  _count?: {
    accounts: number
  }
}

export const transformAccountGroup = ({
  treasuryBookId,
  _count,
  ...rest
}: TransformAccountGroupArgs): AccountGroup => ({
  ...rest,
  count: _count?.accounts,
  branchId: treasuryBookId,
})
