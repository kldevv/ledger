import type { MutationResolvers } from '@/api/graphql'
import { transformTag } from '../../transform'

export const updateTag: MutationResolvers['updateTag'] = async (
  _,
  { input: { id, ...data } },
  { dataSources: { prisma } },
) => {
  const tag = await prisma.tag.updateOne({
    id,
    data,
  })

  return transformTag(tag)
}
