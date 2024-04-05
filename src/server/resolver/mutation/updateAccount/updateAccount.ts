import { updateAccount as _updateAccount } from '@/server/db/prisma/dao/account'

import { transformAccount } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateAccount: MutationResolvers['updateAccount'] = async (
  _,
  { input },
) => {
  const account = await _updateAccount(input)

  return transformAccount(account)
}
