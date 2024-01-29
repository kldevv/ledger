import {
  transformFromPrismaEntries,
  transformToPrismaEntries,
} from '@/server/resolver/transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateTransaction: MutationResolvers['updateTransaction'] = async (
  _,
  { input: { id, treasuryBookId, entries, ...data } },
  { dataSources: { prisma } },
) => {
  return await prisma.transaction.updateOne({
    id,
    treasuryBookId,
    data: {
      ...data,
      entries: transformToPrismaEntries(
        entries.map((entry) => ({ treasuryBookId, ...entry })),
      ),
    },
  })
}
