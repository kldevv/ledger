import { useTranslation } from 'next-i18next'

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

  return (
    <div className="grid w-full grid-cols-3 gap-2">
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
        name={`entries.${index}.debit` as const}
      />
      <InputCurrencyNumber<UpsertTransactionFormFieldValues>
        label={t`UpsertTransactionForm.label.entries.credit`}
        name={`entries.${index}.credit` as const}
      />
      <AccountFormDropdown<UpsertTransactionFormFieldValues>
        name={`entries.${index}.accountId` as const}
      />
    </div>
  )
}
