import { transformTag } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateTag: MutationResolvers['updateTag'] = async (
  _,
  { input: { id, name, type } },
  { dataSources: { prisma } },
) => {
  const tag = await prisma.tag.updateTag({
    id,
    name,
    type,
  })

  return transformTag(tag)
}
