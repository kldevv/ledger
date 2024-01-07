import type { MutationResolvers } from '@/api/graphql'

export const updateTag: MutationResolvers['updateTag'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  return await prisma.tag.updateOne({
    id: input.id,
    data: input,
  })
}
