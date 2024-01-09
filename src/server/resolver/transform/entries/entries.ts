import type { Entry as GraphqlEntry } from '@/api/graphql'
import type {
  Category as PrismaCategory,
  Account as PrismaAccount,
  Entry as PrismaRawEntry,
} from '@prisma/client'

type PrismaEntry = PrismaRawEntry & {
  account?: PrismaAccount & {
    category?: PrismaCategory
  }
}

export const transformFromPrismaEntries = (
  entries: PrismaEntry[],
): GraphqlEntry[] => {
  return entries.map(({ amount, ...entry }) => ({
    ...entry,
    // Positve amount is debit
    debit: Math.max(0, amount),
    // Negative amount is credit
    credit: -Math.min(0, amount),
  }))
}

export const transformToPrismaEntries = (
  entries: Omit<GraphqlEntry, 'id' | 'transactionId'>[],
): Omit<
  PrismaEntry,
  'createdDate' | 'updatedDate' | 'id' | 'transactionId'
>[] => {
  return entries.map(({ debit, credit, account, ...entry }) => ({
    ...entry,
    accountId: account?.id ?? '',
    amount: debit > 0 ? debit : -credit,
  }))
}
