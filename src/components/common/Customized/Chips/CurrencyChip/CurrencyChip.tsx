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
    <div className="border-mid-gray flex select-none items-center rounded-xl border bg-white px-3">
      <span className="text-dark-shades pr-2 text-xs font-medium leading-6">
        {currency}
      </span>
      {icon}
    </div>
  )
}
