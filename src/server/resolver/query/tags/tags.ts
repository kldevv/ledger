import { transformTag } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const tags: QueryResolvers['tags'] = async (
  _,
  { input: { treasuryBookId, type } },
  { dataSources: { prisma } },
) => {
  const tags = await prisma.tag.findTags({
    treasuryBookId,
    type: type ?? undefined,
  })

  return tags.map(transformTag)
}
