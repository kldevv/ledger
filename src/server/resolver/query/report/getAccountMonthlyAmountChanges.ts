import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyAmountChangesTransform } from '../../transform'

export const getAccountMonthlyAmountChanges: QueryResolvers['getAccountMonthlyAmountChanges'] =
  async (
    _,
    { input: { vaultId, year, type } },
    { dataSources: { prisma } },
  ) => {
    const input = {
      vaultId,
      year: year != null ? year : undefined,
    }

    const prismaReturns =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByMonthAndAccount(input)
        : await prisma.transaction.groupByMonthAndAccount(input)

    return monthlyAmountChangesTransform.transform(prismaReturns)
  }
