import { findAccount } from '@/server/db/prisma/dao/account'

import { transformAccount } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const account: QueryResolvers['account'] = async (
  _,
  { input: { id } },
) => {
  const account = await findAccount({ id })

  return transformAccount(account)
}
