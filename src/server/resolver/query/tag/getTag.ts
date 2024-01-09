import type { QueryResolvers } from '@/api/graphql'

export const getTag: QueryResolvers['getTag'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  return await prisma.tag.readOne(input)
}
