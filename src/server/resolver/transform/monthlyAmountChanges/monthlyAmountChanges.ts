import type { AmountChangeOnMonth } from '@/api/graphql'
import type { groupByMonthAndAccountReturns } from '@/server/db/prisma/dao/entry'

export const transform = (prismaReturns: groupByMonthAndAccountReturns) => {
  const mappings = new Map<string, AmountChangeOnMonth[]>()

  prismaReturns.forEach(({ id, month, debit, credit }) => {
    const amountChange = {
      month,
      amountChange: {
        debit,
        credit,
      },
    }

    const amountChangeOnMonth = mappings.get(id)

    if (amountChangeOnMonth == null) {
      // set the first element if not found
      mappings.set(id, [amountChange])
    } else {
      // otherwise add the new record
      amountChangeOnMonth.push(amountChange)
    }
  })

  return Array.from(mappings.entries()).map(([id, amountChanges]) => ({
    id,
    amountChanges,
  }))
}
