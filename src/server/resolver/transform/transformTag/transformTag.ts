import type { Tag } from '@prisma/client'

export type TransformTagProps = Tag & {
  /**
   * Aggregate relation field: count
   */
  _count: {
    transactions: number
  }
}

export const transformTag = ({ _count, ...tag }: TransformTagProps) => {
  return {
    ...tag,
    count: _count.transactions,
  }
}
