import { transformTransaction } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const transactions: QueryResolvers['transactions'] = async (
  _,
  { input: { treasuryBookId, tagId, status } },
  { dataSources: { prisma } },
) => {
  const transactions = await prisma.transaction.findTransactions({
    treasuryBookId: treasuryBookId ?? undefined,
    tagId: tagId ?? undefined,
    status: status ?? undefined,
  })

  return transactions.map(transformTransaction)
}
