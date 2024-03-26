import { transformTag } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateTag: MutationResolvers['updateTag'] = async (
  _,
  { input: { id, ...data } },
  { dataSources: { prisma } },
) => {
  const tag = await prisma.tag.updateTag({
    id,
    data,
  })

  return transformTag(tag)
}
