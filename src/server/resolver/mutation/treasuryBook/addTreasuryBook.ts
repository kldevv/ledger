import type { MutationResolvers } from '@/api/graphql'

export const addTreasuryBook: MutationResolvers['addTreasuryBook'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  return await prisma.treasuryBook.createOne(input)
}
