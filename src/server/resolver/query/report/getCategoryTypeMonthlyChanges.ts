import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyChanges } from '../../transform'

export const getCategoryTypeMonthlyChanges: QueryResolvers['getCategoryTypeMonthlyChanges'] =
  async (
    _,
    { input: { treasuryBookId, year, type, status } },
    { dataSources: { prisma } },
  ) => {
    const input = {
      treasuryBookId,
      year: year != null ? year : undefined,
      status: status != null ? status : undefined,
    }

    const prismaReturns =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndCategoryType(input)
        : await prisma.transaction.groupByMonthAndCategoryType(input)

    return monthlyChanges.transform(prismaReturns)
  }
