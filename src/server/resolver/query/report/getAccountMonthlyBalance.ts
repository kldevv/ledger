import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyChanges } from '../../transform'

export const getAccountMonthlyBalance: QueryResolvers['getAccountMonthlyBalance'] =
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
        ? await prisma.entry.groupByMonthAndAccount(input)
        : await prisma.transaction.groupByMonthAndAccount(input)

    return monthlyChanges.transform(prismaReturns)
  }
