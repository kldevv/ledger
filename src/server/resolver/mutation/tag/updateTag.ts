import type { MutationResolvers } from '@/api/graphql'

export const updateTag: MutationResolvers['updateTag'] = async (
  _,
  { input: { id, ...data } },
  { dataSources: { prisma } },
) => {
  return await prisma.tag.updateOne({
    id,
    data,
  })
}
