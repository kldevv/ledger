import { TagType } from '@prisma/client'

import { transformTag } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const tags: QueryResolvers['tags'] = async (
  _,
  { input: { treasuryBookId } },
  { dataSources: { prisma } },
) => {
  const tags = await prisma.tag.findTags({
    treasuryBookId,
    type: TagType.CUSTOM,
  })

  return tags.map(transformTag)
}
