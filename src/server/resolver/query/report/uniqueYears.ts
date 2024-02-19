import { DateType, type QueryResolvers } from '@/api/graphql'

export const uniqueYears: QueryResolvers['uniqueYears'] = async (
  _,
  { input: { treasuryBookId, type } },
  { dataSources: { prisma } },
) => {
  const prismaReturns =
    type === DateType.TRANSACTION
      ? await prisma.entry.findTransactionDateUniqueYears({ treasuryBookId })
      : await prisma.transaction.findAccrualDateUniqueYears({ treasuryBookId })

  return prismaReturns.map(({ year }) => year)
}
