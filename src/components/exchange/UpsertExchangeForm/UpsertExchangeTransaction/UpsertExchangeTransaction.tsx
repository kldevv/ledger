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
      <div className="flex w-full items-center justify-center">
        <h3 className="text-gray border-b-mid-gray w-fit select-none border-b px-6 pb-1 text-center text-xs font-medium leading-6">
          {t('UpsertExchangeForm.transactionTitle', {
            type: `${
              name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
            }`,
          })}
        </h3>
      </div>
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
