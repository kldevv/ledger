import type { Link } from '@/api/graphql'
import type { findLinks } from '@/server/db/prisma/dao/link'

export const transformLink = (
  link: Awaited<ReturnType<typeof findLinks>>[number],
): Link => ({
  ...link,
  count: link._count.transactions,
})
