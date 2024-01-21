import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyChanges } from '../../transform'

export const getCategoryTypeMonthlyBalance: QueryResolvers['getCategoryTypeMonthlyBalance'] =
  async (
    _,
    { input: { vaultId, year, type, status } },
    { dataSources: { prisma } },
  ) => {
    const input = {
      vaultId,
      year: year != null ? year : undefined,
      status: status != null ? status : undefined,
    }

    const prismaReturns =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndCategoryType(input)
        : await prisma.transaction.groupByMonthAndCategoryType(input)

    return monthlyChanges.transform(prismaReturns)
  }
