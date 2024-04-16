import { createBranch } from '@/server/db/prisma/dao/branch'

import type { MutationResolvers } from '@/api/graphql'

export const addBranch: MutationResolvers['addBranch'] = async (
  _,
  { input },
) => {
  return await createBranch(input)
}
