import { useTranslation } from 'next-i18next'

import { EntryStatus } from '@/api/graphql'
import {
  InputText,
  InputCurrencyNumber,
  InputDate,
  EntryStatusFromDropdown,
  AccountFormDropdown,
} from '@/components/common'

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
}

export const EntryField: React.FC<EntryFieldProps> = ({
  name,
}: EntryFieldProps) => {
  const { t } = useTranslation('entry')

  return (
    <div className="flex flex-col space-y-3">
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
        />
        <InputCurrencyNumber
          label={t`EntryField.credit`}
          name={`${name}.credit` as const}
        />
      </div>
    </div>
  )
}
