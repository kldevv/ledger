import type { QueryResolvers } from '@/api/graphql'

export const getCategories: QueryResolvers['getCategories'] = async (
  _,
  { input: { treasuryBookId } },
  { dataSources: { prisma } },
) => {
  const categories = await prisma.category.readMany({ treasuryBookId })

  return categories.map(({ _count, ...category }) => ({
    ...category,
    accountCount: _count.accounts,
  }))
}
