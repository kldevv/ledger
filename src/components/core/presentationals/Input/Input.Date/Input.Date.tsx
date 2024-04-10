import { forwardRef } from 'react'
import { PatternFormat } from 'react-number-format'

import { InputText } from '../Input.Text/Input.Text'

export interface InputDateProps
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

export const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  ({ onChange, value, onBlur, disabled, placeholder, className }, ref) => {
    return (
      <PatternFormat
        mask={'-'}
        className={className}
        onBlur={onBlur}
        getInputRef={ref}
        disabled={disabled}
        format="####/##/##"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        customInput={InputText}
      />
    )
  },
)

InputDate.displayName = 'Input.Date'
