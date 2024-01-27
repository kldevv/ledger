import classNames from 'classnames'
import { useMemo } from 'react'
import { numericFormatter } from 'react-number-format'

import { useTreasuryBookContext } from '@/hooks'
import { getCurrencySymbol } from '@/lib/formatter/getCurrencySymbol/getCurrencySymbol'

export interface FormattedNumberProps {
  /**
   * Value
   */
  value: number | string
  /**
   * Customized class name
   */
  className?: string
}

export const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  className,
}) => {
  const { selectedTreasuryBookId, data: { getVaults } = {} } =
    useTreasuryBookContext()

  const selectedCurrency = useMemo(
    () => getVaults?.find(({ id }) => id === selectedTreasuryBookId)?.currency,
    [getVaults, selectedTreasuryBookId],
  )

  const currencySymbol = getCurrencySymbol(selectedCurrency)

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
