import {
  transformFromPrismaEntries,
  transformToPrismaEntries,
} from '@/server/resolver/transform'

import type { MutationResolvers } from '@/api/graphql'

export const addTransaction: MutationResolvers['addTransaction'] = async (
  _,
  { input: { entries, vaultId, ...data } },
  { dataSources: { prisma } },
) => {
  const { entries: createdEntries, ...createdTransaction } =
    await prisma.transaction.createOne({
      ...data,
      vaultId,
      entries: transformToPrismaEntries(
        entries.map((entry) => ({ vaultId, ...entry })),
      ),
    })

  return {
    ...createdTransaction,
    entries: transformFromPrismaEntries(createdEntries),
  }
}
