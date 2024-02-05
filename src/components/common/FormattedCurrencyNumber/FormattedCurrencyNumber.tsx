import classNames from 'classnames'
import { useMemo } from 'react'

import { useTreasuryBookContext } from '@/hooks'
import { formatCurrencyNumber } from '@/lib'
import { getCurrencySymbol } from '@/lib/utils/getCurrencySymbol/getCurrencySymbol'

import type { Currency } from '@/api/graphql'

export interface FormattedCurrencyNumberProps {
  /**
   * Value
   */
  value?: number | string | null
  /**
   * Customized class name
   */
  className?: string
  /**
   * Override the selected currency
   */
  currency?: Currency
}

export const FormattedCurrencyNumber: React.FC<
  FormattedCurrencyNumberProps
> = ({ value, currency, className }) => {
  const { selectedTreasuryBookId, data: { getTreasuryBooks } = {} } =
    useTreasuryBookContext()

  const currencySymbol = useMemo(() => {
    const selectedCurrency = currency
      ? currency
      : getTreasuryBooks?.find(({ id }) => id === selectedTreasuryBookId)
          ?.currency

    return getCurrencySymbol(selectedCurrency)
  }, [currency, getTreasuryBooks, selectedTreasuryBookId])

  return (
    <div className={classNames('w-30 flex items-center', className)}>
      <div className="select-none text-xs font-medium leading-6">
        {currencySymbol}
      </div>
      <div className="ml-auto pl-8 text-xs font-medium leading-6">
        {formatCurrencyNumber(value)}
      </div>
    </div>
  )
}
