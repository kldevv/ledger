import type { QueryResolvers } from '@/api/graphql'

export const transaction: QueryResolvers['transaction'] = async (
  _,
  { input: { id } },
  { dataSources: { prisma } },
) => {
  return await prisma.transaction.readOne({ id })
}
