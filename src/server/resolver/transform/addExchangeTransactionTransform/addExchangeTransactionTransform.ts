import { AddEntryInput } from '@/api/graphql'
import { addEntryInputTransform } from '..'

export type AddExchangeTransactionTransformProps = {
  /**
   * Accrual date
   */
  accrualDate: Date
  /**
   * Treasury book id
   */
  treasuryBookId: string
  /**
   * Add entry input
   */
  entries: Array<AddEntryInput>
}

export const addExchangeTransactionTransform = ({
  accrualDate,
  treasuryBookId,
  entries,
}: AddExchangeTransactionTransformProps) => {
  return {
    accrualDate,
    treasuryBookId,
    tagIds: [],
    entries: entries.map((entry) =>
      addEntryInputTransform({ entry, treasuryBookId }),
    ),
    note: `EXCHANGE`,
  }
}
