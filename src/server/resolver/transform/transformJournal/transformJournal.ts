import { EntryStatus } from '@prisma/client'

import type { Journal } from '@/api/graphql'
import type { Currency, Journal as PrismaJournal } from '@prisma/client'

export type TransformJournalArgs = PrismaJournal & {
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
  branch: {
    currency: Currency
  }
}

export const transformJournal = ({
  entries,
  branchId,
  branch,
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
    currency: branch.currency,
    branchId,
    count: entries.length,
    status,
    amount,
  }
}
