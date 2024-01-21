import type { AmountOnMonth } from '@/api/graphql'
import type {
  GroupByMonthAndAccountReturns,
  GroupByMonthAndCategoryReturns,
  GroupByMonthAndCategoryTypeReturns,
} from '@/server/db/prisma/dao/entry'

export const transform = (
  prismaReturns:
    | GroupByMonthAndAccountReturns
    | GroupByMonthAndCategoryReturns
    | GroupByMonthAndCategoryTypeReturns,
) => {
  const mappings = new Map<string, [string, AmountOnMonth[]]>()

  prismaReturns.forEach(({ id, name, month, debit, credit }) => {
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

  return Array.from(mappings.entries()).map(([id, [name, amounts]]) => ({
    id,
    name,
    amounts,
  }))
}
