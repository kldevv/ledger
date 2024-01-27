import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyChanges } from '../../transform'

export const getAccountMonthlyChanges: QueryResolvers['getAccountMonthlyChanges'] =
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
        ? await prisma.entry.groupByMonthAndAccount(input)
        : await prisma.transaction.groupByMonthAndAccount(input)

    return monthlyChanges.transform(prismaReturns)
  }
