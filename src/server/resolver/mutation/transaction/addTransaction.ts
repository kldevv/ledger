import {
  addEntryInputTransform,
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
    await prisma.transaction.createTransaction({
      ...data,
      treasuryBookId,
      entries: entries.map((entry) =>
        addEntryInputTransform({ entry, treasuryBookId }),
      ),
    })

  return {
    ...createdTransaction,
    entries: transformFromPrismaEntries(createdEntries),
  }
}
