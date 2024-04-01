import { findBranch } from '@/server/db/prisma/dao/branch'

import { tBranch } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const branch: QueryResolvers['branch'] = async (_, { input }) => {
  const branch = await findBranch(input)

  return branch != null ? tBranch(branch) : null
}
