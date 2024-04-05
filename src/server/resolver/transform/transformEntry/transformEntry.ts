import type { Entry } from '@/api/graphql/__generated__'
import type { Entry as PrismaEntry } from '@prisma/client'

type TransformEntryArgs = PrismaEntry & {
  /**
   * Relation field: transaction
   */
  transaction: {
    note: string
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
  ...rest
}: TransformEntryArgs): Entry => {
  return {
    ...rest,
    journal: {
      id: transactionId,
      note: transaction.note,
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
