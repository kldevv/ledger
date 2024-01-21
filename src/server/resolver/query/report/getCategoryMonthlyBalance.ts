import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyBalance } from '../../transform'

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

    const changes =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndCategory(input)
        : await prisma.transaction.groupByMonthAndCategory(input)

    const balance =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByAccount(input)
        : []

    return monthlyBalance.transform(balance, changes)
  }
