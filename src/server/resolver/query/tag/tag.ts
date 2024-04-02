import { findTag } from '@/server/db/prisma/dao/tag'

import { transformTag } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const tag: QueryResolvers['tag'] = async (_, { input }) => {
  const tag = await findTag(input)

  if (tag == null) return null

  return transformTag(tag)
}
