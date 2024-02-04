import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { TreasuryBookFormDropdown } from '@/components/common'

import { UpsertExchangeTransactionEntryFieldArray } from '../UpsertExchangeTransactionEntryFieldArray'

import type { UpsertExchangeFormFieldValues } from '@/lib'

export interface UpsertExchangeTransactionProps {
  /**
   * Exchange transaction name
   */
  name: 'origin' | 'destination'
}

export const UpsertExchangeTransaction: React.FC<
  UpsertExchangeTransactionProps
> = ({ name }) => {
  const { t } = useTranslation('exchange')

  const { watch } = useFormContext<UpsertExchangeFormFieldValues>()

  return (
    <div className="flex flex-col space-y-6">
      <h3 className="text-gray w-full text-center text-lg font-light leading-6">
        {t('UpsertExchangeForm.transactionTitle', {
          type: `${
            name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
          }`,
        })}
      </h3>
      <div className="w-96">
        <TreasuryBookFormDropdown<UpsertExchangeFormFieldValues>
          name={`${name}.treasuryBookId`}
          excludeTreasuryBookId={watch(
            `${name === 'origin' ? 'destination' : 'origin'}.treasuryBookId`,
          )}
        />
      </div>
      <div>
        <UpsertExchangeTransactionEntryFieldArray name={name} />
      </div>
    </div>
  )
}
