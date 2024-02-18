import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Currency } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { UpsertExchangeTransactionEntryField } from '../UpsertExchangeTransactionEntryField'

import type { UpsertExchangeFormFieldValues } from '@/lib'

export interface UpsertExchangeTransactionEntryFieldArrayProps {
  /**
   * Exchange transaction name
   */
  name: 'origin' | 'destination'
}

export const UpsertExchangeTransactionEntryFieldArray: React.FC<
  UpsertExchangeTransactionEntryFieldArrayProps
> = ({ name }) => {
  const { t } = useTranslation('exchange')
  const { watch } = useFormContext<UpsertExchangeFormFieldValues>()
  const { data } = useTreasuryBookContext()

  const transactionTreasuryBookId = watch(`${name}.treasuryBookId`)

  const selectedCurrency = useMemo(
    () =>
      data?.treasuryBooks?.find(({ id }) => id === transactionTreasuryBookId)
        ?.currency ?? Currency.USD,
    [data?.treasuryBooks, transactionTreasuryBookId],
  )

  const { fields, append, remove } =
    useFieldArray<UpsertExchangeFormFieldValues>({
      name: `${name}.entries`,
    })

  return (
    <div className="flex flex-col gap-y-3">
      {fields.map((field, index) => (
        <div key={field.id}>
          <span className="text-light-accent -mb-3 text-[0.5rem] font-semibold leading-6">
            {t('UpsertExchangeForm.entryTitle', {
              index: index + 1,
            })}
          </span>
          <UpsertExchangeTransactionEntryField
            index={index}
            name={name}
            // The last table row will be have a button to append more
            append={index === fields.length - 1 ? append : null}
            // We will maintain at least two rows
            remove={fields.length > 2 ? remove : null}
            currency={selectedCurrency}
          />
        </div>
      ))}
    </div>
  )
}
