import { CN, EU, TW, US } from 'country-flag-icons/react/3x2'

import { Currency } from '@/api/graphql'

export interface CurrencyChipProps {
  /**
   * Currency
   */
  currency?: Currency
}

const iconCn = 'w-3 h-3'

export const CurrencyChip: React.FC<CurrencyChipProps> = ({ currency }) => {
  const icon = (() => {
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
  })()

  return (
    <div className="rounded-xl border border-mid-gray bg-white flex items-center px-3 select-none">
      <span className="text-dark-shades font-medium leading-6 pr-2">
        {currency}
      </span>
      {icon}
    </div>
  )
}
