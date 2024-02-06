import { transformTag } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const getTag: QueryResolvers['getTag'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const tag = await prisma.tag.findTag(input)

  if (tag == null) {
    return null
  }

  return transformTag(tag)
}
