import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'

import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { EntryStatus } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'
import { z } from 'zod'

import {
  Button,
  InputText,
  InputNumber,
  ListBox,
  StatusChip,
  InputDate,
} from '@/components/common'
import { useAccountsContext } from '@/hooks'
import { numberSchema } from '@/lib'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export const upsertEntryFieldSchema = z
  .object({
    /**
     * Entry transaction date
     */
    transactionDate: z.coerce.date(),
    /**
     * Entry optional memo
     */
    memo: z.string(),
    /**
     * Entry status
     */
    status: z.nativeEnum(EntryStatus),
    /**
     * Entry debit
     */
    debit: numberSchema,
    /**
     * Entry credit
     */
    credit: numberSchema,
    /**
     * Account id
     */
    accountId: z.string(),
  })
  .refine(
    (data) =>
      (data.debit === 0 || data.credit === 0) &&
      (data.debit >= 0 || data.credit >= 0),
    {
      message:
        'Either debit or credit must be positive, and the other must be zero',
    },
  )

export const defaultEntryFieldValue: UpsertTransactionFormFieldValues['entries'][number] =
  {
    transactionDate: new Date(),
    accountId: '',
    memo: '',
    status: EntryStatus.PENDING,
    debit: 0,
    credit: 0,
  }

export interface UpsertEntryFieldProps {
  /**
   * Row index
   */
  index: number
  /**
   * Field append
   */
  append?: UseFieldArrayAppend<UpsertTransactionFormFieldValues> | null
  /**
   * Field remove
   */
  remove?: UseFieldArrayRemove | null
}

export const UpsertEntryField: React.FC<UpsertEntryFieldProps> = ({
  index,
  append,
  remove,
}) => {
  const { t } = useTranslation('transaction')
  const {
    result: { data },
  } = useAccountsContext()

  const handleOnAppend = useCallback(() => {
    void append?.(
      {
        ...defaultEntryFieldValue,
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
        <InputDate<UpsertTransactionFormFieldValues>
          label={t`UpsertTransactionForm.label.entries.transactionDate`}
          name={`entries.${index}.transactionDate` as const}
        />
        <InputText<UpsertTransactionFormFieldValues>
          label={t('UpsertTransactionForm.label.entries.memo')}
          name={`entries.${index}.memo` as const}
        />
        <ListBox<UpsertTransactionFormFieldValues>
          label={t('UpsertTransactionForm.label.entries.status')}
          name={`entries.${index}.status` as const}
          options={Object.keys(EntryStatus).map((value) => ({
            value,
            label: <StatusChip status={value} key={value} />,
          }))}
        />
        <InputNumber<UpsertTransactionFormFieldValues>
          label={t('UpsertTransactionForm.label.entries.debit')}
          name={`entries.${index}.debit` as const}
        />
        <InputNumber<UpsertTransactionFormFieldValues>
          label={t('UpsertTransactionForm.label.entries.credit')}
          name={`entries.${index}.credit` as const}
        />
        <ListBox<UpsertTransactionFormFieldValues>
          label={t('UpsertTransactionForm.label.entries.account')}
          name={`entries.${index}.accountId` as const}
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
