import { findJournal } from '@/server/db/prisma/dao/journal'

import { transformJournal } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const journal: QueryResolvers['journal'] = async (_, { input }) => {
  const journal = await findJournal(input)

  return transformJournal(journal)
}
