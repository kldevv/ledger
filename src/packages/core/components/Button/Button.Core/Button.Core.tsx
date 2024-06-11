import clsx from 'clsx'
import { forwardRef } from 'react'

export interface ButtonCoreProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'type' | 'onClick' | 'disabled' | 'children'
  > {
  /**
   * Loading?
   */
  loading?: boolean
  /**
   * Children
   */
  children: React.ReactNode
}

export const ButtonCore = forwardRef<HTMLButtonElement, ButtonCoreProps>(
  (
    { disabled = false, onClick, type = 'button', className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        type={type}
        className={clsx('whitespace-nowrap text-nowrap', className)}
        {...props}
      />
    )
  },
)

ButtonCore.displayName = 'Button.Core'
