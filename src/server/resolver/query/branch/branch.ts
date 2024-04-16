import { findBranch } from '@/server/db/prisma/dao/branch'

import type { QueryResolvers } from '@/api/graphql'

export const branch: QueryResolvers['branch'] = async (_, { input }) => {
  return await findBranch(input)
}
