import type { QueryResolvers } from '@/api/graphql'

export const getAccount: QueryResolvers['getAccount'] = async (
  _,
  { input: { id } },
  { dataSources: { prisma } },
) => {
  return await prisma.account.readOne({ id })
}
