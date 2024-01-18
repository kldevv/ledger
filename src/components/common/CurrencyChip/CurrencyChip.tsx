import { BanknotesIcon } from '@heroicons/react/24/outline'
import { EU, TW, US } from 'country-flag-icons/react/3x2'

import { Currency } from '@/api/graphql'

export interface CurrencyChipProps {
  /**
   * Currency
   */
  currency?: Currency
}

export const CurrencyChip: React.FC<CurrencyChipProps> = ({ currency }) => {
  const icon = (() => {
    switch (currency) {
      case Currency.USD:
        return <US className="w-3 h-3" />
      case Currency.NTD:
        return <TW className="w-3 h-3" />
      case Currency.EUR:
        return <EU className="w-3 h-3" />
      default:
        return <BanknotesIcon className="w-3 h-3" />
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
