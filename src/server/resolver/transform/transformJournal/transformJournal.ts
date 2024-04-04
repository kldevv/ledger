import { EntryStatus } from '@prisma/client'

import type { Journal } from '@/api/graphql'
import type { Entry, Transaction as PrismaTransaction } from '@prisma/client'

export type TransformJournalArgs = PrismaTransaction & {
  /**
   * Relational field: entries
   */
  entries: Pick<Entry, 'amount' | 'status'>[]
}

export const transformJournal = ({
  entries,
  treasuryBookId,
  ...transaction
}: TransformJournalArgs): Journal => {
  const status = entries.some(({ status }) => status === EntryStatus.PENDING)
    ? EntryStatus.PENDING
    : EntryStatus.COMPLETED

  const amount = entries
    .map(({ amount }) => (amount > 0 ? amount : 0))
    .reduce((prev, cur) => prev + cur, 0)

  return {
    ...transaction,
    branchId: treasuryBookId,
    status,
    amount,
  }
}
