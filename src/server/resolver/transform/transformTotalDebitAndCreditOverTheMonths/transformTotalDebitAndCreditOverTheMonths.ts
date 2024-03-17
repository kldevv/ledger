import { TotalDebitAndCreditOverTheMonths } from '@/api/graphql'
import { FindTotalDebitAndCreditOverTheMonthsReturns } from '@/server/db/prisma/repository'

export const transformTotalDebitAndCreditOverTheMonths = (
  data: FindTotalDebitAndCreditOverTheMonthsReturns,
): TotalDebitAndCreditOverTheMonths[] => {
  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.element_id]) {
      acc[curr.element_id] = {
        id: curr.element_id,
        name: curr.element_name,
        total: [],
      }
    }
    acc[curr.element_id].total.push(curr)
    return acc
  }, {} as { [id: string]: TotalDebitAndCreditOverTheMonths })

  return Object.values(groupedData)
}
