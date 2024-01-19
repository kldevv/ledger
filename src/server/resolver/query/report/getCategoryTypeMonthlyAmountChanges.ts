import type { QueryResolvers } from '@/api/graphql'

export const getCategoryTypeMonthlyAmountChanges: QueryResolvers['getCategoryTypeMonthlyAmountChanges'] =
  async (_, { input }, { dataSources: { prisma } }) => {
    return []
  }
