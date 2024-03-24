import classNames from 'classnames'
import { forwardRef } from 'react'

export interface ButtonCoreProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonCore = forwardRef<HTMLButtonElement, ButtonCoreProps>(
  ({ children, disabled = false, onClick, type, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        type={type}
        className={classNames('size-full', className)}
        {...props}
      >
        {children}
      </button>
    )
  },
)

ButtonCore.displayName = 'Button.Core'
