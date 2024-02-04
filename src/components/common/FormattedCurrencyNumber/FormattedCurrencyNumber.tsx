import classNames from 'classnames'
import { useMemo } from 'react'
import { numericFormatter } from 'react-number-format'

import { useTreasuryBookContext } from '@/hooks'
import { getCurrencySymbol } from '@/lib/utils/getCurrencySymbol/getCurrencySymbol'

import type { Currency } from '@/api/graphql'

export interface FormattedCurrencyNumberProps {
  /**
   * Value
   */
  value: number | string
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
      <div className="text-dark-shades select-none text-xs font-medium leading-6">
        {currencySymbol}
      </div>
      <div className="text-dark-shades ml-auto pl-8 text-xs font-medium leading-6">
        {numericFormatter(String(value), {
          decimalScale: 2,
          thousandSeparator: ',',
          allowLeadingZeros: false,
          allowNegative: false,
          fixedDecimalScale: true,
        })}
      </div>
    </div>
  )
}
