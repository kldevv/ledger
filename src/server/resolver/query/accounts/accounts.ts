import { findAccounts } from '@/server/db/prisma/dao/account'

import { transformAccount } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const accounts: QueryResolvers['accounts'] = async (
  _,
  { input: { branchId, accountGroupId } },
) => {
  const accounts = await findAccounts({
    branchId,
    accountGroupId: accountGroupId ?? undefined,
  })

  return accounts.map(transformAccount)
}
