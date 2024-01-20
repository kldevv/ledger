import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyAmountChangesTransform } from '../../transform'

export const getCategoryMonthlyAmountChanges: QueryResolvers['getCategoryMonthlyAmountChanges'] =
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
        ? await prisma.entry.groupByMonthAndCategory(input)
        : await prisma.transaction.groupByMonthAndCategory(input)

    return monthlyAmountChangesTransform.transform(prismaReturns)
  }
