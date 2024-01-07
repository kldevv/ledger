import type { QueryResolvers, ReportData } from '@/api/graphql'
import { Basis, ReportDateGroupBy } from '@/api/graphql'

export const getReportsBalance: QueryResolvers['getReportsBalance'] = async (
  _,
  { input: { vaultId, basis, groupBy } },
  { dataSources: { prisma } },
) => {
  const dateFilter = new Date(new Date().getFullYear(), 0, 1)

  const balance =
    (await prisma.entry.groupBy({ vaultId, basis, startDate: dateFilter })) ??
    []

  const accu = new Map<string, Omit<ReportData, 'encode'>>()
  const visitedIds = new Set<string>()

  balance.forEach(({ categoryId, accountId, type, debit, credit, count }) => {
    const ids = [categoryId, accountId, type]

    ids.forEach((id: string) => {
      const prev = accu.get(id)

      visitedIds.add(id)

      accu.set(id, {
        debit: debit + (prev?.debit ?? 0),
        credit: credit + (prev?.credit ?? 0),
        count: count + (prev?.count ?? 0),
      })
    })
  })

  const mappings = new Map<string, ReportData>()

  const changes = await prisma.entry.groupByDate({ vaultId, basis, groupBy })

  changes.forEach(
    ({ categoryId, accountId, type, groupBy, debit, credit, count }) => {
      const ids = [categoryId, accountId, type]

      ids.forEach((id: string) => {
        const encode = `${id}::${groupBy}`
        const record = mappings.get(encode)

        visitedIds.add(id)

        mappings.set(encode, {
          debit: debit + (record?.debit ?? 0),
          credit: credit + (record?.credit ?? 0),
          count: count + (record?.count ?? 0),
          encode: encode,
        })
      })
    },
  )

  const [groupByBase, groupByLength] = await (async () => {
    if (groupBy === ReportDateGroupBy.YEAR) {
      if (basis === Basis.ACCRUAL) {
        const { _max, _min } =
          (await prisma.transaction.readMinMaxAccrualDate({ vaultId })) ?? {}

        const minYear = _min?.accrualDate?.getFullYear() ?? 0
        const maxYear = _max?.accrualDate?.getFullYear() ?? 0

        return [minYear, maxYear - minYear + 1]
      } else {
        const { _max, _min } =
          (await prisma.entry.readMinMaxTransactionDate({ vaultId })) ?? {}

        const minYear = _min?.transactionDate?.getFullYear() ?? 0
        const maxYear = _max?.transactionDate?.getFullYear() ?? 0

        return [minYear, maxYear - minYear + 1]
      }
    }

    return groupBy === ReportDateGroupBy.MONTH ? [1, 12] : [1, 4]
  })()

  visitedIds.forEach((id) => {
    Array.from({ length: groupByLength }).forEach((_, index) => {
      const encode = `${id}::${index + groupByBase}`

      const change = mappings.get(encode)
      const prev = accu.get(id)

      const update = {
        debit: (change?.debit ?? 0) + (prev?.debit ?? 0),
        credit: (change?.credit ?? 0) + (prev?.credit ?? 0),
        count: (change?.count ?? 0) + (prev?.count ?? 0),
      }

      accu.set(id, update)

      mappings.set(encode, {
        ...update,
        encode,
      })
    })
  })

  return Array.from(mappings.values())
}
