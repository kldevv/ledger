import { EntryStatus } from '@/api/graphql'

import type { QueryResolvers } from '@/api/graphql'

export const getTransactions: QueryResolvers['getTransactions'] = async (
  _,
  { input: { treasuryBookId, tagId, status } },
  { dataSources: { prisma } },
) => {
  const transactions = await prisma.transaction.readMany({
    treasuryBookId,
    tagId: tagId ?? undefined,
  })

  const transformedTransaction = transactions
    .map(({ entries, ...transaction }) => ({
      ...transaction,
      status: entries?.some(({ status }) => status === EntryStatus.PENDING)
        ? EntryStatus.PENDING
        : EntryStatus.COMPLETED,
    }))
    .filter((transaction) => status == null || status === transaction.status)

  return transformedTransaction
}
