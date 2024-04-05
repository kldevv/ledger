import { findEntry } from '@/server/db/prisma/dao/entry'

import { transformEntry } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const entry: QueryResolvers['entry'] = async (_, { input }) => {
  const entry = await findEntry(input)

  return transformEntry(entry)
}
