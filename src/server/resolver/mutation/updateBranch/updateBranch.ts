import { updateBranch as _updateBranch } from '@/server/db/prisma/dao/branch'

import type { MutationResolvers } from '@/api/graphql'

export const updateBranch: MutationResolvers['updateBranch'] = async (
  _,
  { input },
) => {
  return await _updateBranch(input)
}
