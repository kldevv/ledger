import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import {
  InputText,
  InputCurrencyNumber,
  InputDate,
  EntryStatusFromDropdown,
  AccountFormDropdown,
} from '@/components/common'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export interface UpsertTransactionEntryFieldProps {
  /**
   * Row index
   */
  index: number
}

export const UpsertTransactionEntryField: React.FC<
  UpsertTransactionEntryFieldProps
> = ({ index }) => {
  const { t } = useTranslation('transaction')

  const { watch } = useFormContext()

  const debitName = `entries.${index}.debit` as const
  const creditName = `entries.${index}.credit` as const

  return (
    <div className="grid w-full grid-cols-3 gap-3">
      <InputDate<UpsertTransactionFormFieldValues>
        label={t`UpsertTransactionForm.label.entries.transactionDate`}
        name={`entries.${index}.transactionDate` as const}
      />
      <InputText<UpsertTransactionFormFieldValues>
        label={t`UpsertTransactionForm.label.entries.memo`}
        name={`entries.${index}.memo` as const}
      />
      <EntryStatusFromDropdown<UpsertTransactionFormFieldValues>
        name={`entries.${index}.status` as const}
      />
      <InputCurrencyNumber<UpsertTransactionFormFieldValues>
        label={t`UpsertTransactionForm.label.entries.debit`}
        name={debitName}
        disabled={
          watch(creditName) !== 0 &&
          watch(creditName) !== '0' &&
          watch(creditName) != null
        }
      />
      <InputCurrencyNumber<UpsertTransactionFormFieldValues>
        label={t`UpsertTransactionForm.label.entries.credit`}
        name={creditName}
        disabled={
          watch(debitName) !== 0 &&
          watch(debitName) !== '0' &&
          watch(debitName) != null
        }
      />
      <AccountFormDropdown<UpsertTransactionFormFieldValues>
        name={`entries.${index}.accountId` as const}
      />
    </div>
  )
}
