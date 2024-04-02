import { findBranches } from '@/server/db/prisma/dao/branch'

import { transformBranch } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const branches: QueryResolvers['branches'] = async (
  _,
  { input: { userId } },
) => {
  const branches = await findBranches({
    userId,
  })

  return branches.map(transformBranch)
}
