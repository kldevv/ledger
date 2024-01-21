import type { MonthlyAmount } from '@/api/graphql'
import type {
  GroupByAccountReturns,
  GroupByMonthAndAccountReturns,
} from '@/server/db/prisma/dao/entry'

export const transform = (
  balance: GroupByAccountReturns,
  changes: GroupByMonthAndAccountReturns,
): Array<MonthlyAmount> => {
  const levels = new Map<string, [number, number]>()
  const mappings = new Map<string, Array<[number, number, number]>>()
  const accountName = new Map<string, string>()

  balance.forEach(({ id, name, debit, credit }) => {
    levels.set(id, [debit, credit])

    accountName.set(id, name)

    mappings.set(id, [[0, debit, credit]])
  })

  changes.sort((a, b) => a.month - b.month)

  changes.forEach(({ id, name, month, debit, credit }) => {
    const [preDebit, prevCredit] = levels.get(id) ?? [0, 0]

    const updateLevel: [number, number] = [
      preDebit + debit,
      prevCredit + credit,
    ]

    accountName.set(id, name)

    const amounts = mappings.get(id)

    if (amounts != null) {
      amounts.push([month, ...updateLevel])
    } else {
      mappings.set(id, [
        [0, 0, 0],
        [month, ...updateLevel],
      ])
    }

    levels.set(id, updateLevel)
  })

  const result = Array.from(mappings.entries()).map(([id, value]) => ({
    id,
    name: accountName.get(id) ?? '',
    amounts: value.map(([month, debit, credit]) => ({
      month,
      amount: { debit, credit },
    })),
  }))

  result.sort((a, b) => a.name.localeCompare(b.name))

  return result
}
