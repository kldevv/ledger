import { monthlyChanges } from '..'

import type { AmountOnMonth } from '@/api/graphql'
import type {
  GroupByAccountReturns,
  GroupByMonthAndAccountReturns,
} from '@/server/db/prisma/dao/entry'

export const transform = (
  balance: GroupByAccountReturns,
  changes: GroupByMonthAndAccountReturns,
) => {
  const levelsMappings = new Map<string, { debit: number; credit: number }>()

  balance.forEach(({ id, debit, credit }) => {
    levelsMappings.set(id, { debit, credit })
  })

  const transformedChanges = monthlyChanges.transform(changes)

  transformedChanges.map(({ id, name, amounts: changes }) => {
    changes.sort()

    const changesIndex = 0

    Array.from({ length: 12 }).map((_, index) => {
      const month = index + 1

      const currentChange = changes[changesIndex]

      const currentLevel = levelsMappings.get(id)

      const currentLevelAmount = {
        debit: currentLevel?.debit ?? 0,
        credit: currentLevel?.credit ?? 0,
      }

      if (currentChange != null && currentChange.month === month) {
        return {
          month,
        }
      }
    })
  })
}
