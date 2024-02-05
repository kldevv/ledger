import { EntryStatus } from '@prisma/client'

import type { Transaction as GraphqlTransaction } from '@/api/graphql'
import type { Entry, Transaction } from '@prisma/client'

export type TransformTransactionProps = Transaction & {
  /**
   * Relational field: entries
   */
  entries: Array<Pick<Entry, 'amount' | 'status'>>
}

export const transformTransaction = ({
  entries,
  ...transaction
}: TransformTransactionProps): GraphqlTransaction => {
  const status = entries.some(({ status }) => status === EntryStatus.PENDING)
    ? EntryStatus.PENDING
    : EntryStatus.COMPLETED

  const amount = entries
    .map(({ amount }) => (amount > 0 ? amount : 0))
    .reduce((prev, cur) => prev + cur, 0)

  return {
    ...transaction,
    status,
    amount,
  }
}
