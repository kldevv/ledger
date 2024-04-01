import { transformEntry } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const entries: QueryResolvers['entries'] = async (
  _,
  { input: { treasuryBookId, transactionId, accountId, categoryId } },
  { dataSources: { prisma } },
) => {
  const entries = await prisma.entry.findEntries({
    treasuryBookId: treasuryBookId ?? undefined,
    transactionId: transactionId ?? undefined,
    accountId: accountId ?? undefined,
    categoryId: categoryId ?? undefined,
  })

  return entries.map(transformEntry)
}
