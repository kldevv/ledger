import { DateType, type QueryResolvers } from '@/api/graphql'

import { transformMonthlyChanges } from '../../transform'

export const categoryTypeMonthlyChanges: QueryResolvers['categoryTypeMonthlyChanges'] =
  async (
    _,
    { input: { treasuryBookId, year, type, status } },
    { dataSources: { prisma } },
  ) => {
    const input = {
      treasuryBookId,
      year: year ?? undefined,
      status: status ?? undefined,
    }

    const prismaReturns =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndCategoryType(input)
        : await prisma.transaction.groupByMonthAndCategoryType(input)

    return transformMonthlyChanges(prismaReturns)
  }
