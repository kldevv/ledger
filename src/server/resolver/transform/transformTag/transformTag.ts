import type { Tag } from '@/api/graphql'
import type { Tag as PrismaTag } from '@prisma/client'

export type TransformTagArgs = PrismaTag & {
  /**
   * Aggregate relation field: count
   */
  _count: {
    transactions: number
  }
}

export const transformTag = ({
  _count,
  treasuryBookId,
  ...tag
}: TransformTagArgs): Tag => {
  return {
    ...tag,
    branchId: treasuryBookId,
    count: _count.transactions,
  }
}
