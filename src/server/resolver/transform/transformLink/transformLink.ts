import type { Link } from '@/api/graphql'
import type { Link as PrismaLink } from '@prisma/client'

export type TransformLinkArgs = PrismaLink & {
  /**
   * Aggregate relation field: count
   */
  _count: {
    transactions: number
  }
}

export const transformLink = (link: TransformLinkArgs): Link => ({
  ...link,
  count: link._count.transactions,
})
