import { TreasuryBookFormDropdown } from '@/components/common'

import type { UpsertExchangeFormFieldValues } from '@/lib'
import { UpsertExchangeTransactionEntryFieldArray } from '../UpsertExchangeTransactionEntryFieldArray'

export interface UpsertExchangeTransactionProps {
  /**
   * Exchange transaction name
   */
  name: 'origin' | 'destination'
}

export const UpsertExchangeTransaction: React.FC<
  UpsertExchangeTransactionProps
> = ({ name }) => {
  return (
    <div className="flex flex-col">
      <div className="w-96">
        <TreasuryBookFormDropdown<UpsertExchangeFormFieldValues>
          name={`${name}.treasuryBookId`}
        />
      </div>
      <div className="mt-6">
        <UpsertExchangeTransactionEntryFieldArray name={name} />
      </div>
    </div>
  )
}
