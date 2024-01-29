import { AddEntryInput } from '@/api/graphql'
import { CreateEntryProps } from '@/server/db/prisma/dao/transaction'

export type AddEntryInputTransformProps = {
  /**
   * Transform graphql add entry input
   */
  entry: AddEntryInput
  /**
   * Treasury book id
   */
  treasuryBookId: string
}

export const addEntryInputTransform = ({
  entry: { debit, credit, ...entry },
  treasuryBookId,
}: AddEntryInputTransformProps): CreateEntryProps => {
  return {
    ...entry,
    treasuryBookId,
    amount: debit > 0 ? debit : -credit,
  }
}
