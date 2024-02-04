import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'

import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import {
  Button,
  InputText,
  InputCurrencyNumber,
  InputDate,
  EntryStatusFromDropdown,
  AccountFormDropdown,
} from '@/components/common'
import { useAccountsContext } from '@/hooks'
import { addEntryDefaultValues } from '@/lib'

import type { UpsertExchangeFormFieldValues } from '@/lib'

export interface UpsertExchangeTransactionEntryFieldProps {
  /**
   * Row index
   */
  index: number
  /**
   * Exchange transaction name
   */
  name: 'origin' | 'destination'
  /**
   * Field append
   */
  append?: UseFieldArrayAppend<UpsertExchangeFormFieldValues> | null
  /**
   * Field remove
   */
  remove?: UseFieldArrayRemove | null
}

export const UpsertExchangeTransactionEntryField: React.FC<
  UpsertExchangeTransactionEntryFieldProps
> = ({ index, append, remove, name }) => {
  const { t } = useTranslation('exchange')
  const { data } = useAccountsContext()

  const handleOnAppend = useCallback(() => {
    void append?.(
      {
        ...addEntryDefaultValues,
        accountId: data?.getAccounts[0].id ?? '',
      },
      {
        shouldFocus: false,
      },
    )
  }, [append, data])

  const handleRemove = useCallback(() => {
    void remove?.(index)
  }, [remove, index])

  return (
    <div className="flex items-start gap-x-1">
      <div className="grid w-max max-w-5xl grid-cols-3 gap-x-1">
        <InputDate<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.transactionDate`}
          name={`${name}.entries.${index}.transactionDate` as const}
        />
        <InputText<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.memo`}
          name={`${name}.entries.${index}.memo` as const}
        />
        <EntryStatusFromDropdown<UpsertExchangeFormFieldValues>
          name={`${name}.entries.${index}.status` as const}
        />
        <InputCurrencyNumber<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.debit`}
          name={`${name}.entries.${index}.debit` as const}
        />
        <InputCurrencyNumber<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.credit`}
          name={`${name}.entries.${index}.credit` as const}
        />
        <AccountFormDropdown<UpsertExchangeFormFieldValues>
          name={`${name}.entries.${index}.accountId` as const}
        />
      </div>
      <div className="relative ml-3 mt-20 flex w-10 gap-x-1">
        {remove && (
          <Button onClick={handleRemove}>
            <div className="border-light-accent rounded border">
              <TrashIcon className="text-light-accent size-5" />
            </div>
          </Button>
        )}
        {append && (
          <Button onClick={handleOnAppend}>
            <div className="border-light-accent bg-light-accent rounded border">
              <PlusIcon className="text-light-shades size-5" />
            </div>
          </Button>
        )}
      </div>
    </div>
  )
}
