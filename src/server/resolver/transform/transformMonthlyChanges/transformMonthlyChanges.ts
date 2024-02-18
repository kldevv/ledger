import type { AmountOnMonth, MonthlyAmount } from '@/api/graphql'
import type {
  GroupByMonthAndAccountReturns,
  GroupByMonthAndCategoryReturns,
  GroupByMonthAndCategoryTypeReturns,
} from '@/server/db/prisma/dao/entry'

export type TransformMonthlyChangesProps =
  | GroupByMonthAndAccountReturns
  | GroupByMonthAndCategoryReturns
  | GroupByMonthAndCategoryTypeReturns

export const transformMonthlyChanges = (
  props: TransformMonthlyChangesProps,
): Array<MonthlyAmount> => {
  const mappings = new Map<string, [string, AmountOnMonth[]]>()

  props.forEach(({ id, name, month, debit, credit }) => {
    const amounts = {
      month,
      amount: {
        debit,
        credit,
      },
    }

    const amountOnMonth = mappings.get(id)

    if (amountOnMonth == null) {
      // set the first element if not found
      mappings.set(id, [name, [amounts]])
    } else {
      // otherwise add the new record
      amountOnMonth[1].push(amounts)
    }
  })

  const result = Array.from(mappings.entries()).map(
    ([id, [name, amounts]]) => ({
      id,
      name,
      amounts,
    }),
  )

  result.sort((a, b) => a.name.localeCompare(b.name))

  return result
}
