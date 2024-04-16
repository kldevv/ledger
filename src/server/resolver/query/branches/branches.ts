import { findBranches } from '@/server/db/prisma/dao/branch'

import type { QueryResolvers } from '@/api/graphql'

export const branches: QueryResolvers['branches'] = async (
  _,
  { input: { userId } },
) => {
  return await findBranches({
    userId,
  })
}
