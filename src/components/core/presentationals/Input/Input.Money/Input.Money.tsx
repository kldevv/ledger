import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'

import { InputText } from '../Input.Text/Input.Text'

export interface InputMoneyProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onBlur' | 'disabled' | 'placeholder' | 'className'
  > {
  /**
   * Controlled value
   */
  value: string
  /**
   * On change
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const InputMoney = forwardRef<HTMLInputElement, InputMoneyProps>(
  ({ onChange, value, onBlur, disabled, placeholder, className }, ref) => {
    return (
      <NumericFormat
        decimalScale={2}
        thousandSeparator={','}
        allowLeadingZeros={false}
        allowNegative={false}
        fixedDecimalScale={true}
        className={className}
        onBlur={onBlur}
        getInputRef={ref}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        customInput={InputText}
      />
    )
  },
)

InputMoney.displayName = 'Input.Date'
