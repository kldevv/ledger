import { DateType, type QueryResolvers } from '@/api/graphql'

import { transformMonthlyBalance } from '../../transform'

export const accountMonthlyBalance: QueryResolvers['accountMonthlyBalance'] =
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
        ? await prisma.entry.groupByMonthAndAccount(changeInput)
        : await prisma.transaction.groupByMonthAndAccount(changeInput)

    const balanceInput = { ...changeInput, year: changeInput.year - 1 }

    const init =
      type === DateType.TRANSACTION
        ? await prisma.entry.groupByAccount(balanceInput)
        : await prisma.transaction.groupByAccount(balanceInput)

    return transformMonthlyBalance({ init, changes })
  }
