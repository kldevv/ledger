import {
  transformFromPrismaEntries,
  transformToPrismaEntries,
} from '@/server/resolver/transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateTransaction: MutationResolvers['updateTransaction'] = async (
  _,
  { input: { id, vaultId, entries, ...data } },
  { dataSources: { prisma } },
) => {
  const { entries: updatedEntries, ...updatedTransaction } =
    await prisma.transaction.updateOne({
      id,
      vaultId,
      data: {
        ...data,
        entries: transformToPrismaEntries(
          entries.map((entry) => ({ vaultId, ...entry })),
        ),
      },
    })

  return {
    ...updatedTransaction,
    entries: transformFromPrismaEntries(updatedEntries),
  }
}
