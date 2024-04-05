import { findEntries } from '@/server/db/prisma/dao/entry'

import { transformEntry } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const entries: QueryResolvers['entries'] = async (
  _,
  { input: { treasuryBookId, transactionId, accountId, categoryId } },
) => {
  const entries = await findEntries({
    treasuryBookId: treasuryBookId ?? undefined,
    transactionId: transactionId ?? undefined,
    accountId: accountId ?? undefined,
    categoryId: categoryId ?? undefined,
  })

  return entries.map(transformEntry)
}
