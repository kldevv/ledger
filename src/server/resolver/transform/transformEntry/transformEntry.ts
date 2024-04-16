import type { Entry } from '@/api/graphql/__generated__'
import type { Currency, Entry as PrismaEntry } from '@prisma/client'

type TransformEntryArgs = PrismaEntry & {
  /**
   * Relation field: treasury book
   */
  branch: {
    currency: Currency
  }
  /**
   * Relation field: journal
   */
  journal: {
    note: string
    accrualDate: Date
  }
  /**
   * Relation field: account
   */
  account: {
    name: string
  }
}

export const transformEntry = ({
  journal,
  journalId,
  account,
  accountId,
  amount,
  branch,
  ...rest
}: TransformEntryArgs): Entry => {
  return {
    ...rest,
    currency: branch.currency,
    journal: {
      id: journalId,
      note: journal.note,
      accrualDate: journal.accrualDate,
    },
    account: {
      id: accountId,
      name: account.name,
    },
    // Positve amount is debit, and debit is always positive
    debit: amount > 0 ? amount : 0,
    // Negative amount is credit, and credit is always positive
    credit: amount < 0 ? -amount : 0,
  }
}
