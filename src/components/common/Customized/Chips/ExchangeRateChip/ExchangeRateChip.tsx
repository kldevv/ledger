import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

import { FormattedCurrencyNumber } from '@/components/common'

import { CurrencyChip } from '..'

import type { Currency } from '@/api/graphql'

export interface ExchangeRateChipProps {
  /**
   * Origin source
   */
  origin?: ExchangeSourceInfo
  /**
   * Destination source
   */
  destination?: ExchangeSourceInfo
}

type ExchangeSourceInfo = {
  /**
   * Exchange currency
   */
  currency: Currency
  /**
   * Exchange amount
   */
  amount: number
}

export const ExchangeRateChip: React.FC<ExchangeRateChipProps> = ({
  origin,
  destination,
}) => {
  if (origin == null || destination == null) {
    return null
  }

  return (
    <div className="border-mid-gray flex h-[2.5rem] items-center space-x-12 rounded-md border bg-white px-6 py-2">
      <div className="flex items-center space-x-3">
        <FormattedCurrencyNumber value={origin.amount} />
        <CurrencyChip currency={origin.currency} />
      </div>
      <div className="flex items-center space-x-3">
        <ArrowsRightLeftIcon className="size-5" />
        <span className="text-dark-shades">
          {destination.amount !== 0 ? origin.amount / destination.amount : 0}
        </span>
        <ArrowsRightLeftIcon className="size-5" />
      </div>
      <div className="flex items-center space-x-3">
        <FormattedCurrencyNumber value={destination.amount} />
        <CurrencyChip currency={destination.currency} />
      </div>
    </div>
  )
}
