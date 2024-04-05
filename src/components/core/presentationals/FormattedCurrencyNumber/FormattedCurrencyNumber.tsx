import classNames from 'classnames'

import { formatCurrencyNumber } from '@/shared/utils'
import { getCurrencySymbol } from '@/shared/utils/getCurrencySymbol/getCurrencySymbol'

import type { Currency } from '@/api/graphql'

export interface FormattedCurrencyNumberProps {
  /**
   * Value
   */
  value: number | string | null
  /**
   * Customized class name
   */
  className?: string
  /**
   * Currency
   */
  currency: Currency
}

export const FormattedCurrencyNumber: React.FC<
  FormattedCurrencyNumberProps
> = ({ value, currency, className }) => {
  return (
    <div className={classNames('flex items-center gap-x-2', className)}>
      <span className="select-none">{getCurrencySymbol(currency)}</span>
      <span className="text-xs font-medium">{formatCurrencyNumber(value)}</span>
    </div>
  )
}
