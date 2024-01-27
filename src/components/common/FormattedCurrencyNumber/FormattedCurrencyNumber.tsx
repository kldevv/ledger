import classNames from 'classnames'
import { useMemo } from 'react'
import { numericFormatter } from 'react-number-format'

import { useTreasuryBookContext } from '@/hooks'
import { getCurrencySymbol } from '@/lib/formatter/getCurrencySymbol/getCurrencySymbol'

export interface FormattedCurrencyNumberProps {
  /**
   * Value
   */
  value: number | string
  /**
   * Customized class name
   */
  className?: string
}

export const FormattedCurrencyNumber: React.FC<
  FormattedCurrencyNumberProps
> = ({ value, className }) => {
  const { selectedTreasuryBookId, data: { getTreasuryBooks } = {} } =
    useTreasuryBookContext()

  const currencySymbol = useMemo(() => {
    const currency = getTreasuryBooks?.find(
      ({ id }) => id === selectedTreasuryBookId,
    )?.currency

    return getCurrencySymbol(currency)
  }, [getTreasuryBooks, selectedTreasuryBookId])

  return (
    <div className={classNames('w-30 flex items-center', className)}>
      <div className="font-normal text-xs select-none">{currencySymbol}</div>
      <div className="ml-auto pl-8">
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
