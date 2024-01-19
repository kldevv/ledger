import { monthlyAmountChangesTransform } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const getAccountMonthlyAmountChanges: QueryResolvers['getAccountMonthlyAmountChanges'] =
  async (_, { input }, { dataSources: { prisma } }) => {
    const prismaReturns = await prisma.entry.groupByMonthAndAccount(input)

    return monthlyAmountChangesTransform.transform(prismaReturns)
  }
