import { DateType, type QueryResolvers } from '@/api/graphql'

import { monthlyAmountChangesTransform } from '../../transform'

export const getAccountMonthlyAmountChanges: QueryResolvers['getAccountMonthlyAmountChanges'] =
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
        ? await prisma.entry.groupByMonthAndAccount(input)
        : await prisma.transaction.groupByMonthAndAccount(input)

    return monthlyAmountChangesTransform.transform(prismaReturns)
  }
