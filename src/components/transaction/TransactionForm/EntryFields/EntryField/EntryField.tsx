import { useTranslation } from 'next-i18next'

import { EntryStatus } from '@/api/graphql'
import {
  InputText,
  InputCurrencyNumber,
  InputDate,
  EntryStatusFromDropdown,
  AccountFormDropdown,
} from '@/components/common'

import type { TransactionFormFieldValues } from '../..'

export const entryFieldDefaultValues: TransactionFormFieldValues['entries'][number] =
  {
    transactionDate: new Date(),
    memo: '',
    status: EntryStatus.PENDING,
    debit: '0',
    credit: '0',
    accountId: '',
  }

export interface UpsertTransactionEntryFieldProps {
  /**
   * Row index
   */
  index: number
}

export const EntryField: React.FC<UpsertTransactionEntryFieldProps> = ({
  index,
}) => {
  const { t } = useTranslation('transaction')

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full space-x-2">
        <InputDate<TransactionFormFieldValues>
          label={t`TransactionForm.label.entries.transactionDate`}
          name={`entries.${index}.transactionDate` as const}
        />
        <EntryStatusFromDropdown<TransactionFormFieldValues>
          name={`entries.${index}.status` as const}
        />
        <InputText<TransactionFormFieldValues>
          label={t`TransactionForm.label.entries.memo`}
          name={`entries.${index}.memo` as const}
        />
      </div>
      <AccountFormDropdown<TransactionFormFieldValues>
        name={`entries.${index}.accountId` as const}
      />
      <div className="flex w-full space-x-2">
        <InputCurrencyNumber<TransactionFormFieldValues>
          label={t`TransactionForm.label.entries.debit`}
          name={`entries.${index}.debit` as const}
        />
        <InputCurrencyNumber<TransactionFormFieldValues>
          label={t`TransactionForm.label.entries.credit`}
          name={`entries.${index}.credit` as const}
        />
      </div>
    </div>
  )
}
