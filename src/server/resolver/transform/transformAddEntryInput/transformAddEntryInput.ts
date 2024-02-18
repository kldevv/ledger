import { AddEntryInput } from '@/api/graphql'
import { CreateEntryProps } from '@/server/db/prisma/dao/transaction'

export type TransformAddEntryInputProps = {
  /**
   * Transform graphql add entry input
   */
  entry: AddEntryInput
  /**
   * Treasury book id
   */
  treasuryBookId: string
}

export const transformAddEntryInput = ({
  entry: { debit, credit, ...entry },
  treasuryBookId,
}: TransformAddEntryInputProps): CreateEntryProps => {
  return {
    ...entry,
    treasuryBookId,
    amount: debit > 0 ? debit : -credit,
  }
}
