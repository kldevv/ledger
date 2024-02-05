import type { Entry } from '@prisma/client'

export type TransformEntryProps = Entry

export const transformEntry = ({ amount, ...entry }: TransformEntryProps) => {
  return {
    ...entry,
    // positve amount is debit
    debit: Math.max(0, amount),
    // negative amount is credit
    credit: -Math.min(0, amount),
  }
}
