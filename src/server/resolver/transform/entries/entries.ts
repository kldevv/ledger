import type { AddEntryInput, Entry as GraphqlEntry } from '@/api/graphql'
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
  entries: Omit<AddEntryInput, 'id' | 'transactionId'>[],
): Omit<
  PrismaEntry,
  'createdAt' | 'updatedAt' | 'id' | 'vaultId' | 'transactionId' | 'deletedAt'
>[] => {
  return entries.map(({ debit, credit, ...entry }) => ({
    ...entry,
    amount: debit > 0 ? debit : -credit,
  }))
}
