import { CN, EU, TW, US } from 'country-flag-icons/react/3x2'

import { Currency } from '@/api/graphql'

export const getCurrencyIcon = (currency: Currency | undefined) => {
  const iconCn = 'w-3 h-3'

  switch (currency) {
    case Currency.NTD:
      return <TW className={iconCn} />
    case Currency.EUR:
      return <EU className={iconCn} />
    case Currency.RMB:
      return <CN className={iconCn} />
    default:
      return <US className={iconCn} />
  }
}
