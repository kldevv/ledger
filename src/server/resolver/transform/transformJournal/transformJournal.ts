import { EntryStatus } from '@prisma/client'

import type { Journal } from '@/api/graphql'
import type { Currency, Transaction as PrismaTransaction } from '@prisma/client'

export type TransformJournalArgs = PrismaTransaction & {
  /**
   * Relational field: entries
   */
  entries: {
    amount: number
    status: EntryStatus
  }[]
  /**
   * Relational field: tags
   */
  tags: {
    id: string
    name: string
  }[]
  /**
   * Relational field: tags
   */
  links: {
    id: string
    name: string
  }[]
  /**
   * Relational field: branch
   */
  treasuryBook: {
    currency: Currency
  }
}

export const transformJournal = ({
  entries,
  treasuryBookId,
  treasuryBook,
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
    currency: treasuryBook.currency,
    branchId: treasuryBookId,
    count: entries.length,
    status,
    amount,
  }
}
