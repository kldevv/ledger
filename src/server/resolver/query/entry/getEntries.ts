import { transformFromPrismaEntries } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const getEntries: QueryResolvers['getEntries'] = async (
  _,
  { input: { vaultId, transactionId, accountId, categoryId } },
  { dataSources: { prisma } },
) => {
  const entries = await prisma.entry.readMany({
    vaultId,
    transactionId: transactionId ?? undefined,
    accountId: accountId ?? undefined,
    categoryId: categoryId ?? undefined,
  })

  return transformFromPrismaEntries(entries)
}
