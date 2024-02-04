import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'

import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { EntryStatus } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  Button,
  InputText,
  InputCurrencyNumber,
  Dropdown,
  StatusChip,
  InputDate,
} from '@/components/common'
import { useAccountsContext } from '@/hooks'
import { UpsertExchangeFormFieldValues, addEntryDefaultValues } from '@/lib'

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
  const {
    result: { data },
  } = useAccountsContext()

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

  const accountOptions = useMemo(
    () =>
      data?.getAccounts.map(({ id, name }) => ({
        value: id,
        label: name,
      })) ?? [],
    [data?.getAccounts],
  )

  return (
    <div className="flex gap-x-1 items-start">
      <div className="grid grid-cols-3 w-max gap-x-1 max-w-5xl">
        <InputDate<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.transactionDate`}
          name={`${name}.entries.${index}.transactionDate` as const}
        />
        <InputText<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.memo`}
          name={`${name}.entries.${index}.memo` as const}
        />
        <Dropdown<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.status`}
          name={`${name}.entries.${index}.status` as const}
          options={Object.keys(EntryStatus).map((value) => ({
            value,
            label: <StatusChip status={value} key={value} />,
          }))}
        />
        <InputCurrencyNumber<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.debit`}
          name={`${name}.entries.${index}.debit` as const}
        />
        <InputCurrencyNumber<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.credit`}
          name={`${name}.entries.${index}.credit` as const}
        />
        <Dropdown<UpsertExchangeFormFieldValues>
          label={t`UpsertExchangeForm.label.entries.account`}
          name={`${name}.entries.${index}.accountId` as const}
          options={accountOptions}
        />
      </div>
      <div className="mt-20 flex gap-x-1 w-10 relative">
        {remove && (
          <Button onClick={handleRemove} className="absolute left-1">
            <div className="rounded border border-light-accent">
              <TrashIcon className="w-3 h-3 text-light-accent" />
            </div>
          </Button>
        )}
        {append && (
          <Button onClick={handleOnAppend} className="absolute right-1">
            <div className="rounded border border-light-accent bg-light-accent">
              <PlusIcon className="w-3 h-3 text-light-shades" />
            </div>
          </Button>
        )}
      </div>
    </div>
  )
}
