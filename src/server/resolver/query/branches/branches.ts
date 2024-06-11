import { findBranches } from '@/server/db/prisma/dao/branch'

import type { QueryResolvers } from '@/api/graphql'

export const branches: QueryResolvers['branches'] = async (
  _,
  __,
  { session },
) => {
  if (session?.user.id == null) {
    return []
  }

  return await findBranches({
    userId: session?.user.id,
  })
}
