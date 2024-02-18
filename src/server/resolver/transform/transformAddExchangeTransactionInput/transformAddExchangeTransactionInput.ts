import { AddEntryInput } from '@/api/graphql'
import { transformAddEntryInput } from '..'

export type TransformAddExchangeTransactionInputProps = {
  /**
   * Accrual date
   */
  accrualDate: Date
  /**
   * Treasury book id
   */
  treasuryBookId: string
  /**
   * Exchange transaction note
   */
  note: string
  /**
   * Add entry input
   */
  entries: Array<AddEntryInput>
}

export const transformAddExchangeTransactionInput = ({
  accrualDate,
  treasuryBookId,
  entries,
  note,
}: TransformAddExchangeTransactionInputProps) => {
  return {
    accrualDate,
    treasuryBookId,
    tagIds: [],
    entries: entries.map((entry) =>
      transformAddEntryInput({ entry, treasuryBookId }),
    ),
    note,
  }
}
