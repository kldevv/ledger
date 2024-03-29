import { Currency } from '@/api/graphql'

import type { FlagIconProps } from '@/components/core/presentationals'

export const currencyToFlagIconName = (
  currency: Currency,
): FlagIconProps['name'] => {
  switch (currency) {
    case Currency.NTD:
      return 'TW'
    case Currency.EUR:
      return 'EU'
    case Currency.RMB:
      return 'CN'
    default:
      return 'US'
  }
}
