import { TagType, type MutationResolvers } from '@/api/graphql'
import { transformTag } from '../../transform'

export const addTag: MutationResolvers['addTag'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const tag = await prisma.tag.createOne({
    ...input,
    type: TagType.CUSTOM,
  })

  return transformTag(tag)
}
