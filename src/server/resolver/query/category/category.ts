import type { QueryResolvers } from '@/api/graphql'

export const category: QueryResolvers['category'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  return await prisma.category.readOne(input)
}
