import { transformAccount } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const account: QueryResolvers['account'] = async (
  _,
  { input: { id } },
  { dataSources: { prisma } },
) => {
  const account = await prisma.account.findAccount({ id })

  if (account == null) return null

  return transformAccount(account)
}
