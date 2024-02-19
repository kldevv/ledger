import type { QueryResolvers } from '@/api/graphql'

export const account: QueryResolvers['account'] = async (
  _,
  { input: { id } },
  { dataSources: { prisma } },
) => {
  return await prisma.account.findAccount({ id })
}
