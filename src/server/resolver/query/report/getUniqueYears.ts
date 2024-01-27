import { DateType, type QueryResolvers } from '@/api/graphql'

export const getUniqueYears: QueryResolvers['getUniqueYears'] = async (
  _,
  { input: { treasuryBookId, type } },
  { dataSources: { prisma } },
) => {
  const prismaReturns =
    type === DateType.TRANSACTION
      ? await prisma.entry.readUniqueYear({ treasuryBookId })
      : await prisma.transaction.readUniqueYear({ treasuryBookId })

  return prismaReturns.map(({ year }) => year)
}
