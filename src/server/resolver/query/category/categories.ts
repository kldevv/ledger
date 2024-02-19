import type { QueryResolvers } from '@/api/graphql'

export const categories: QueryResolvers['categories'] = async (
  _,
  { input: { treasuryBookId } },
  { dataSources: { prisma } },
) => {
  const categories = await prisma.category.findCategories({ treasuryBookId })

  return categories.map(({ _count, ...category }) => ({
    ...category,
    accountCount: _count.accounts,
  }))
}
