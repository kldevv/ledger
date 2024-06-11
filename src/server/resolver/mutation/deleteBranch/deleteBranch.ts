import { GraphQLError } from 'graphql'

import { deleteBranch as _deleteBranch } from '@/server/db/prisma/dao/branch'

import { createResolver } from '../../createResolver'

import type { MutationResolvers } from '@/api/graphql'

export const deleteBranch: MutationResolvers['deleteBranch'] = createResolver({
  resolver: async (_, { input }, { session }) => {
    if (session?.user.id == null) throw new GraphQLError('')

    return await _deleteBranch({ ...input, userId: session.user.id })
  },
})
