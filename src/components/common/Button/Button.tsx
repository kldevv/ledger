import { forwardRef } from 'react'

import { LoadingBox } from '..'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * Is button loading?
   */
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = forwardRef(
  ({ children, loading = false, disabled = false, onClick, ...props }, ref) => {
    if (loading) return <LoadingBox className="h-6 w-32" />

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        type="button"
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
