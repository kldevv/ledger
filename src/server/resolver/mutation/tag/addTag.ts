import type { MutationResolvers } from '@/api/graphql'

export const addTag: MutationResolvers['addTag'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  return await prisma.tag.createOne(input)
}
