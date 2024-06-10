import { updateBranch as _updateBranch } from '@/server/db/prisma/dao/branch'

import { createResolver } from '../../createResolver'

import type { MutationResolvers } from '@/api/graphql'

export const updateBranch: MutationResolvers['updateBranch'] = createResolver({
  resolver: async (_, { input }) => {
    return await _updateBranch(input)
  },
})
