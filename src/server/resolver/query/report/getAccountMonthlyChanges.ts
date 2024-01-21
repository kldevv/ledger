import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyChanges } from '../../transform'

export const getAccountMonthlyChanges: QueryResolvers['getAccountMonthlyChanges'] =
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

    console.log(prismaReturns)

    return monthlyChanges.transform(prismaReturns)
  }
