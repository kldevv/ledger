import type { AccountGroup } from '@/api/graphql'
import type { AccountGroup as PrismaAccountGroup } from '@prisma/client'

type TransformAccountGroupArgs = PrismaAccountGroup & {
  /**
   * Aggregate relation field: count
   */
  _count?: {
    accounts: number
  }
}

export const transformAccountGroup = ({
  _count,
  ...rest
}: TransformAccountGroupArgs): AccountGroup => ({
  ...rest,
  count: _count?.accounts,
})
