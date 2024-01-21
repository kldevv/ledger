import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyBalance } from '../../transform'

export const getAccountMonthlyBalance: QueryResolvers['getAccountMonthlyBalance'] =
  async (
    _,
    { input: { vaultId, year, type, status } },
    { dataSources: { prisma } },
  ) => {
    const changeInput = {
      vaultId,
      year: year != null ? year : new Date().getFullYear(),
      status: status != null ? status : undefined,
    }

    const changes =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndAccount(changeInput)
        : await prisma.transaction.groupByMonthAndAccount(changeInput)

    const balanceInput = { ...changeInput, year: changeInput.year - 1 }

    const balance =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByAccount(balanceInput)
        : []

    return monthlyBalance.transform(balance, changes)
  }
