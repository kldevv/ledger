import { useTranslation } from 'next-i18next'
import { InputText } from '@/components/common'
import { UpsertExchangeFormFieldValues } from '@/lib'

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

  return (
    <div className="flex flex-col">
      <InputText<UpsertExchangeFormFieldValues>
        name={`${name}.treasuryBookId`}
        label={t('UpsertExchangeTransaction.label.treasuryBookId')}
      />
    </div>
  )
}
