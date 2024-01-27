import {
  transformFromPrismaEntries,
  transformToPrismaEntries,
} from '@/server/resolver/transform'

import type { MutationResolvers } from '@/api/graphql'

export const addTransaction: MutationResolvers['addTransaction'] = async (
  _,
  { input: { entries, treasuryBookId, ...data } },
  { dataSources: { prisma } },
) => {
  const { entries: createdEntries, ...createdTransaction } =
    await prisma.transaction.createOne({
      ...data,
      treasuryBookId,
      entries: transformToPrismaEntries(
        entries.map((entry) => ({ treasuryBookId, ...entry })),
      ),
    })

  return {
    ...createdTransaction,
    entries: transformFromPrismaEntries(createdEntries),
  }
}
