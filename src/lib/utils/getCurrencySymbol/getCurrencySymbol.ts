import { Currency } from '@/api/graphql'

export const getCurrencySymbol = (currency: Currency | undefined) => {
  switch (currency) {
    case Currency.NTD:
      return 'NT$'
    case Currency.EUR:
      return '€'
    case Currency.RMB:
      return '¥'
    default:
      return 'US$'
  }
}
