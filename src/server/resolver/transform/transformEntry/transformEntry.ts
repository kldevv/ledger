import type { Entry } from '@/api/graphql/__generated__'
import type { Currency, Entry as PrismaEntry } from '@prisma/client'

type TransformEntryArgs = PrismaEntry & {
  /**
   * Relation field: treasury book
   */
  treasuryBook: {
    currency: Currency
  }
  /**
   * Relation field: transaction
   */
  transaction: {
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
  transaction,
  transactionId,
  account,
  accountId,
  amount,
  treasuryBookId,
  treasuryBook,
  ...rest
}: TransformEntryArgs): Entry => {
  return {
    ...rest,
    currency: treasuryBook.currency,
    journal: {
      id: transactionId,
      note: transaction.note,
      accrualDate: transaction.accrualDate,
    },
    account: {
      id: accountId,
      name: account.name,
    },
    branchId: treasuryBookId,
    // Positve amount is debit, and debit is always positive
    debit: amount > 0 ? amount : 0,
    // Negative amount is credit, and credit is always positive
    credit: amount < 0 ? -amount : 0,
  }
}
