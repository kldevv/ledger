import type { QueryResolvers } from '@/api/graphql'

export const getCategoryMonthlyAmountChanges: QueryResolvers['getCategoryMonthlyAmountChanges'] =
  async (_, { input }, { dataSources: { prisma } }) => {
    return []
  }
