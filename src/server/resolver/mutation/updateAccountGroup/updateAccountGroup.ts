import { updateAccountGroup as _updateAccountGroup } from '@/server/db/prisma/dao/accountGroup'

import { transformAccountGroup } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateAccountGroup: MutationResolvers['updateAccountGroup'] =
  async (_, { input }) => {
    const accountGroup = await _updateAccountGroup(input)

    return transformAccountGroup(accountGroup)
  }
