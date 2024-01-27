import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyBalance } from '../../transform'

export const getCategoryMonthlyBalance: QueryResolvers['getCategoryMonthlyBalance'] =
  async (
    _,
    { input: { treasuryBookId, year, type, status } },
    { dataSources: { prisma } },
  ) => {
    const changeInput = {
      treasuryBookId,
      year: year != null ? year : new Date().getFullYear(),
      status: status != null ? status : undefined,
    }

    const changes =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndCategory(changeInput)
        : await prisma.transaction.groupByMonthAndCategory(changeInput)

    const balanceInput = { ...changeInput, year: changeInput.year - 1 }

    const balance =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByCategory(balanceInput)
        : await prisma.transaction.groupByCategory(balanceInput)

    return monthlyBalance.transform(balance, changes)
  }
