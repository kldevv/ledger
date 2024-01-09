import type { QueryResolvers, ReportData } from '@/api/graphql'

export const getReports: QueryResolvers['getReports'] = async (
  _,
  { input: { vaultId, basis, groupBy } },
  { dataSources: { prisma } },
) => {
  const data = await prisma.entry.groupByAccountAndDate({
    vaultId,
    basis,
    groupBy,
  })

  const mappings = new Map<string, ReportData>()

  data.forEach(
    ({ categoryId, accountId, type, groupBy, debit, credit, count }) => {
      const ids = [categoryId, accountId, type]

      ids.forEach((id: string) => {
        const encode = `${id}::${groupBy}`
        const record = mappings.get(encode)

        mappings.set(encode, {
          debit: debit + (record?.debit ?? 0),
          credit: credit + (record?.credit ?? 0),
          count: count + (record?.count ?? 0),
          encode: encode,
        })
      })
    },
  )

  return Array.from(mappings.values())
}
