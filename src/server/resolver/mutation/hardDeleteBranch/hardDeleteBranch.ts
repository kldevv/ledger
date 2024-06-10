import { hardDeleteBranch as _hardDeleteBranch } from '@/server/db/prisma/dao/branch'

import { createResolver } from '../../createResolver'

import type { MutationResolvers } from '@/api/graphql'

export const hardDeleteBranch: MutationResolvers['hardDeleteBranch'] =
  createResolver({
    resolver: async (_, { input }) => {
      return await _hardDeleteBranch(input)
    },
  })
