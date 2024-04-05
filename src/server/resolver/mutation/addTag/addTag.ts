import { type MutationResolvers } from '@/api/graphql'
import { createTag } from '@/server/db/prisma/dao/tag'

import { transformTag } from '../../transform'

export const addTag: MutationResolvers['addTag'] = async (_, { input }) => {
  const tag = await createTag(input)

  return transformTag(tag)
}
