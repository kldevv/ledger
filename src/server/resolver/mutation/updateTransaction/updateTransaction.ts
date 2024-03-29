import { transformAddEntryInput } from '@/server/resolver/transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateTransaction: MutationResolvers['updateTransaction'] = async (
  _,
  { input: { id, treasuryBookId, entries, ...data } },
  { dataSources: { prisma } },
) => {
  return await prisma.transaction.updateTransaction({
    id,
    treasuryBookId,
    data: {
      ...data,
      entries: entries.map((entry) =>
        transformAddEntryInput({ entry, treasuryBookId }),
      ),
    },
  })
}
