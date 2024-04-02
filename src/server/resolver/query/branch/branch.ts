import { findBranch } from '@/server/db/prisma/dao/branch'

import { transformBranch } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const branch: QueryResolvers['branch'] = async (_, { input }) => {
  const branch = await findBranch(input)

  return branch != null ? transformBranch(branch) : null
}
