import { createAccountGroup } from '@/server/db/prisma/dao/accountGroup'

import { transformAccountGroup } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const addAccountGroup: MutationResolvers['addAccountGroup'] = async (
  _,
  { input },
) => {
  const accountGroup = await createAccountGroup(input)

  return transformAccountGroup(accountGroup)
}
