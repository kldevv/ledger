import { findTreasuryBooks } from '@/server/db/prisma/dao/treasuryBook'

import { tBranch } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const branches: QueryResolvers['branches'] = async (
  _,
  { input: { currency, userId } },
) => {
  const branches = await findTreasuryBooks({
    currency: currency ?? undefined,
    ownerId: userId,
  })

  return branches.map(tBranch)
}
