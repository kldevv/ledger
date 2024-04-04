import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Currency } from '@/api/graphql'
import { currencyToFlagIconName } from '@/shared/utils'

export const useCurrencyDropdown = () => {
  const { t } = useTranslation('branch')

  return useMemo(
    () => ({
      items: [Currency.USD, Currency.NTD, Currency.EUR, Currency.RMB].map(
        (currency) => ({
          value: currency,
          title: t(`currency.${currency}`),
          flagIcon: currencyToFlagIconName(currency),
        }),
      ),
    }),
    [t],
  )
}
