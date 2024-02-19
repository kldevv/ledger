import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { Currency } from '@/api/graphql'
import { ExchangeRateChip } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'
import { parseNumberString, type UpsertExchangeFormFieldValues } from '@/shared'

export const UpsertExchangeRateChip: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { watch } = useFormContext<UpsertExchangeFormFieldValues>()
  const { data } = useTreasuryBookContext()

  const sources = watch(['origin', 'destination'])

  const transformedSources = useMemo(
    () =>
      sources
        .filter((value) => value != null)
        .map(
          ({
            treasuryBookId,
            entries,
          }: UpsertExchangeFormFieldValues['destination' | 'origin']) => {
            const currency =
              data?.treasuryBooks.find(({ id }) => id === treasuryBookId)
                ?.currency ?? Currency.USD

            const amount = entries
              .map(({ debit }) => debit)
              .reduce((prev, cur) => prev + parseNumberString(cur), 0)

            return { currency, amount }
          },
        ),
    [data?.treasuryBooks, sources],
  )

  return (
    <div className="flex flex-col items-center space-y-1">
      <h3 className="text-gray text-xs font-medium leading-6">{t`UpsertExchangeForm.rate`}</h3>
      <ExchangeRateChip
        origin={transformedSources.at(0)}
        destination={transformedSources.at(1)}
      />
    </div>
  )
}
