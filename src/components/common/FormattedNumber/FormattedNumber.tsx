import classNames from 'classnames'
import { numericFormatter } from 'react-number-format'

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
  return (
    <div className={classNames('w-30 flex items-center', className)}>
      <div className="font-normal text-xs">US$</div>
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
