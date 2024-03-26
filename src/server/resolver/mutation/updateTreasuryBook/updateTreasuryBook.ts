import type { MutationResolvers } from '@/api/graphql'

export const updateTreasuryBook: MutationResolvers['updateTreasuryBook'] =
  async (_, { input }, { dataSources: { prisma } }) => {
    return await prisma.treasuryBook.updateTreasuryBook({
      id: input.id,
      data: input,
    })
  }
