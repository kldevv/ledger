import { Basis, QueryResolvers, ReportRecord } from "@/api/graphql";

export const getMonthlyReports: QueryResolvers['getMonthlyReports'] = async (
  _, { input: { year, vaultId, basis = Basis.ACCRUAL } }, { dataSources: { prisma } }
) => {
  const data = await (async () => {
    switch (basis) {
      case Basis.CASH:
        return await prisma.entry.readSumsByTransactionMonth({ vaultId, year })
      case Basis.ACCRUAL:
      default:
        return await prisma.entry.readSumsByAccrualMonth({ vaultId, year })
    }
  })()

  const mappings = new Map<string, ReportRecord>()

  data.forEach(({ categoryId, accountId, type, month, year, debit, credit, count }) => {
    const dateEncode = `${year}::${month}`

    const ids = [categoryId, accountId, type]

    ids.forEach((id: string) => {
      const encode = `${id}::${dateEncode}`
      const record = mappings.get(encode)

      mappings.set(encode, {
        debit: debit + (record?.debit ?? 0),
        credit: credit + (record?.credit ?? 0),
        count: count + (record?.count ?? 0),
        encode: encode
      })
    })
  })

  return Array.from(mappings.values())
}