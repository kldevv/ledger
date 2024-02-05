import { getCurrencyIcon } from '@/lib'

import type { Currency } from '@/api/graphql'

export interface CurrencyChipProps {
  /**
   * Currency
   */
  currency?: Currency
}

export const CurrencyChip: React.FC<CurrencyChipProps> = ({ currency }) => {
  return (
    <div className="border-mid-gray flex w-fit select-none items-center rounded-xl border bg-white px-3">
      <span className="text-dark-shades pr-2 text-xs font-medium leading-6">
        {currency}
      </span>
      {getCurrencyIcon(currency)}
    </div>
  )
}
