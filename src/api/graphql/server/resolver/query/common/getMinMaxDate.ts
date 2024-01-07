import { Basis, type QueryResolvers } from '@/api/graphql'

export const getMinMaxDate: QueryResolvers['getMinMaxDate'] = async (
  _,
  { input: { vaultId, basis } },
  { dataSources: { prisma } },
) => {
  if (basis === Basis.ACCRUAL) {
    const data = await prisma.transaction.readMinMaxAccrualDate({ vaultId })

    return {
      minDate: data?._min.accrualDate,
      maxDate: data?._max.accrualDate,
    }
  } else {
    const data = await prisma.entry.readMinMaxTransactionDate({ vaultId })

    return {
      minDate: data?._min.transactionDate,
      maxDate: data?._max.transactionDate,
    }
  }
}
