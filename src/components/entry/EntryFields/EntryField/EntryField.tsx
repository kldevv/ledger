import { useTranslation } from 'next-i18next'

import { EntryStatus } from '@/api/graphql'
import {
  InputText,
  InputCurrencyNumber,
  InputDate,
  EntryStatusFromDropdown,
  AccountFormDropdown,
} from '@/components/core'

import type { Currency } from '@/api/graphql'

export const entryFieldDefaultValues = {
  transactionDate: new Date(),
  memo: '',
  status: EntryStatus.PENDING,
  debit: '0',
  credit: '0',
  accountId: '',
}

export interface EntryFieldProps {
  /**
   * Field name
   */
  name: string
  /**
   * Override default currency
   */
  currency?: Currency
}

export const EntryField: React.FC<EntryFieldProps> = ({
  name,
  currency,
}: EntryFieldProps) => {
  const { t } = useTranslation('entry')

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex w-full space-x-2">
        <InputDate
          label={t`EntryField.transactionDate`}
          name={`${name}.transactionDate` as const}
        />
        <EntryStatusFromDropdown name={`${name}.status` as const} />
        <InputText label={t`EntryField.memo`} name={`${name}.memo` as const} />
      </div>
      <AccountFormDropdown name={`${name}.accountId` as const} />
      <div className="flex w-full space-x-2">
        <InputCurrencyNumber
          label={t`EntryField.debit`}
          name={`${name}.debit` as const}
          currency={currency}
        />
        <InputCurrencyNumber
          label={t`EntryField.credit`}
          name={`${name}.credit` as const}
          currency={currency}
        />
      </div>
    </div>
  )
}
