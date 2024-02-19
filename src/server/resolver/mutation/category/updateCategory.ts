import type { MutationResolvers } from '@/api/graphql'

export const updateCategory: MutationResolvers['updateCategory'] = async (
  _,
  { input: { id, ...data } },
  { dataSources: { prisma } },
) => {
  return await prisma.category.updateCategory({
    id,
    data,
  })
}
