import classNames from 'classnames'
import { forwardRef } from 'react'

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={classNames('cursor-text outline-none', className)}
        ref={ref}
        autoComplete="on"
        {...props}
      />
    )
  },
)

InputText.displayName = 'Input.Text'
