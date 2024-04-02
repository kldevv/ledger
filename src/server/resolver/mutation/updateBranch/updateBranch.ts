import { updateBranch as _updateBranch } from '@/server/db/prisma/dao/branch'

import { transformBranch } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateBranch: MutationResolvers['updateBranch'] = async (
  _,
  { input },
) => {
  const branch = await _updateBranch(input)

  return transformBranch(branch)
}
