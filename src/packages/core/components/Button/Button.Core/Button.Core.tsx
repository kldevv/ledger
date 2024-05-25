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

/**
 * Styleless native HTML button wrapper. Should not be used directly.
 */
export const ButtonCore = forwardRef<HTMLButtonElement, ButtonCoreProps>(
  ({ disabled = false, onClick, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        type={type}
        {...props}
      />
    )
  },
)

ButtonCore.displayName = 'Button.Core'
