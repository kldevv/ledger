import type { MutationResolvers } from '@/api/graphql'

export const addAccount: MutationResolvers['addAccount'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  return await prisma.account.createAccount(input)
}
