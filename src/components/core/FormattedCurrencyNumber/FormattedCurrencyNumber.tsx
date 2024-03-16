import classNames from 'classnames'

import { formatCurrencyNumber } from '@/shared'
import { getCurrencySymbol } from '@/shared/utils/getCurrencySymbol/getCurrencySymbol'

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
  return (
    <div className={classNames('w-30 flex items-center', className)}>
      <div className="mr-3 select-none text-xs font-medium">
        {getCurrencySymbol(currency)}
      </div>
      <div className="ml-auto text-xs font-medium">
        {formatCurrencyNumber(value)}
      </div>
    </div>
  )
}
