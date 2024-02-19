import type { MutationResolvers } from '@/api/graphql'
import { transformTag } from '../../transform'

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
