import { CN, EU, TW, US } from 'country-flag-icons/react/3x2'

import { Currency } from '@/api/graphql'

const iconCn = 'size-3'

export const getCurrencyIcon = (currency: Currency | undefined) => {
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
