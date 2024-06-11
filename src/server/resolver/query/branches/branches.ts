import { findBranches } from '@/server/db/prisma/dao/branch'

import type { QueryResolvers } from '@/api/graphql'

export const branches: QueryResolvers['branches'] = async (
  _,
  { input },
  { session },
) => {
  if (session?.user.id == null) {
    return []
  }

  return await findBranches({
    ...input,
    userId: session?.user.id,
  })
}
