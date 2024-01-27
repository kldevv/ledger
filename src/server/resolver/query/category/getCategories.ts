import type { QueryResolvers } from '@/api/graphql'

export const getCategories: QueryResolvers['getCategories'] = async (
  _,
  { input: { treasuryBookId } },
  { dataSources: { prisma } },
) => {
  return await prisma.category.readMany({ treasuryBookId })
}
