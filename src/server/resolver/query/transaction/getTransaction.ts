import type { QueryResolvers } from '@/api/graphql'

export const getTransaction: QueryResolvers['getTransaction'] = async (
  _,
  { input: { id } },
  { dataSources: { prisma } },
) => {
  return await prisma.transaction.readOne({ id })
}
