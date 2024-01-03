import { QueryResolvers, ReportData } from "@/api/graphql";

export const getReports: QueryResolvers['getReports'] = async (
  _, { input: { year, amountHandle, vaultId, basis, groupBy } }, { dataSources: { prisma } }
) => {
  const data = await prisma.entry.groupByDate({ vaultId, basis, amountHandle, groupBy })

  const mappings = new Map<string, ReportData>()

  data.forEach(({ categoryId, accountId, type, groupBy, debit, credit, amount, count }) => {
    const ids = [categoryId, accountId, type]

    ids.forEach((id: string) => {
      const encode = `${id}::${groupBy}`
      const record = mappings.get(encode)

      mappings.set(encode, {
        debit: (debit ?? 0) + (record?.debit ?? 0),
        credit: (credit ?? 0) + (record?.credit ?? 0),
        amount: (amount ?? 0) + (record?.amount ?? 0),
        count: count + (record?.count ?? 0),
        encode: encode
      })
    })
  })

  return Array.from(mappings.values())
}