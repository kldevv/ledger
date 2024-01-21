import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyChanges } from '../../transform'

export const getCategoryMonthlyBalance: QueryResolvers['getCategoryMonthlyBalance'] =
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
        ? await prisma.entry.groupByMonthAndCategory(input)
        : await prisma.transaction.groupByMonthAndCategory(input)

    return monthlyChanges.transform(prismaReturns)
  }
