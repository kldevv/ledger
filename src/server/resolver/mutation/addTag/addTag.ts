import { type MutationResolvers } from '@/api/graphql'

import { transformTag } from '../../transform'

export const addTag: MutationResolvers['addTag'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const tag = await prisma.tag.createTag(input)

  return transformTag(tag)
}
