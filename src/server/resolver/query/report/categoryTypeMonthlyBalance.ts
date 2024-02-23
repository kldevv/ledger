import { DateType, type QueryResolvers } from '@/api/graphql'

import { transformMonthlyBalance } from '../../transform'

export const categoryTypeMonthlyBalance: QueryResolvers['categoryTypeMonthlyBalance'] =
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
        ? await prisma.entry.groupByMonthAndCategoryType(changeInput)
        : await prisma.transaction.groupByMonthAndCategoryType(changeInput)

    const balanceInput = { ...changeInput, year: changeInput.year - 1 }

    const init =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByCategoryType(balanceInput)
        : await prisma.transaction.groupByCategoryType(balanceInput)

    return transformMonthlyBalance({ init, changes })
  }