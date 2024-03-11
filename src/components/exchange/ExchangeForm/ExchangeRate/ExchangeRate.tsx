import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { Currency } from '@/api/graphql'
import { ExchangeRateChip } from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'
import { parseCurrencyNumericFormat } from '@/shared'

import type { ExchangeFormFieldValues } from '@/shared'

export const ExchangeRate: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { watch } = useFormContext<ExchangeFormFieldValues>()
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
          }: ExchangeFormFieldValues['destination' | 'origin']) => {
            const currency =
              data?.treasuryBooks.find(({ id }) => id === treasuryBookId)
                ?.currency ?? Currency.USD

            const amount = entries
              .map(({ debit }) => debit)
              .reduce((prev, cur) => prev + parseCurrencyNumericFormat(cur), 0)

            return { currency, amount }
          },
        ),
    [data?.treasuryBooks, sources],
  )

  return (
    <div className="flex flex-col items-center space-y-1">
      <h3 className="text-gray text-xs font-medium leading-6">{t`ExchangeForm.rate`}</h3>
      <ExchangeRateChip
        origin={transformedSources.at(0)}
        destination={transformedSources.at(1)}
      />
    </div>
  )
}
