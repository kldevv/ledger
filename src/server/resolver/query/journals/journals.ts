import { findJournals } from '@/server/db/prisma/dao/journal'

import { transformJournal } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const journals: QueryResolvers['journals'] = async (
  _,
  { input: { branchId, tagId, linkId } },
) => {
  const journals = await findJournals({
    branchId: branchId ?? undefined,
    tagId: tagId ?? undefined,
    linkId: linkId ?? undefined,
  })

  return journals.map(transformJournal)
}
