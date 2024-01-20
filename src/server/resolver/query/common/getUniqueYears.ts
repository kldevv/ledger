import { DateType, type QueryResolvers } from '@/api/graphql'

export const getUniqueYears: QueryResolvers['getUniqueYears'] = async (
  _,
  { input: { vaultId, type } },
  { dataSources: { prisma } },
) => {
  const prismaReturns =
    type === DateType.TRANSACTION
      ? await prisma.entry.readUniqueYear({ vaultId })
      : await prisma.transaction.readUniqueYear({ vaultId })

  return prismaReturns.map(({ year }) => year)
}
