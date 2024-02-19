import { DateType, type QueryResolvers } from '@/api/graphql'

import { transformMonthlyChanges } from '../../transform'

export const categoryMonthlyChanges: QueryResolvers['categoryMonthlyChanges'] =
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
        ? await prisma.entry.groupByMonthAndCategory(input)
        : await prisma.transaction.groupByMonthAndCategory(input)

    return transformMonthlyChanges(prismaReturns)
  }
