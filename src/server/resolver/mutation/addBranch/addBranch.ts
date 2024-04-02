import { createBranch } from '@/server/db/prisma/dao/branch'

import { transformBranch } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const addBranch: MutationResolvers['addBranch'] = async (
  _,
  { input },
) => {
  const branch = await createBranch(input)

  return transformBranch(branch)
}
