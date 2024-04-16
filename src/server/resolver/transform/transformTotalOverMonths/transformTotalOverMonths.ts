import type { TotalOverMonths } from '@/api/graphql'
import type { FindTotalOverMonthsReturns } from '@/server/db/prisma/repository'

// Intermediary grouped data
type GroupedData = {
  id: string
  name: string
  total: {
    debit: number
    credit: number
    month: number
  }[]
}

export type TransformTotalOverMonthsArgs = FindTotalOverMonthsReturns

export const transformTotalOverMonths = (
  data: TransformTotalOverMonthsArgs,
): TotalOverMonths[] => {
  // Grouping data by id and name
  const groupedData: GroupedData[] = data.reduce((acc: GroupedData[], curr) => {
    let group = acc.find(
      (item) => item.id === curr.id && item.name === curr.name,
    )
    if (!group) {
      group = {
        id: curr.id,
        name: curr.name,
        total: [],
      }
      acc.push(group)
    }
    group.total.push({
      month: curr.month,
      debit: curr.debit,
      credit: curr.credit,
    })
    return acc
  }, [])

  // Fill missing months with zeros
  groupedData.forEach((group) => {
    const monthsWithData = group.total.map((entry) => entry.month)
    for (let month = 1; month <= 12; month++) {
      if (!monthsWithData.includes(month)) {
        group.total.push({
          month: month,
          debit: 0,
          credit: 0,
        })
      }
    }
    // Sort data by month
    group.total.sort((a, b) => a.month - b.month)
  })

  return groupedData
}
