import { createAccount } from '@/server/db/prisma/dao/account'

import { transformAccount } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const addAccount: MutationResolvers['addAccount'] = async (
  _,
  { input },
) => {
  const account = await createAccount(input)

  return transformAccount(account)
}
