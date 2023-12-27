import { Basis, QueryResolvers } from "@/api/graphql";

export const getSumsByMonth: QueryResolvers['getSumsByMonth'] = async (
  _, { input: { startDate, endDate, type = Basis.ACCRUAL } }, { dataSources: { prisma } }
) => {
  switch (type) {
    case Basis.CASH:
      return await prisma.entry.readSumsByTransactionMonth()
    case Basis.ACCRUAL:
    default:
      return await prisma.entry.readSumsByAccrualMonth()
  }
}
