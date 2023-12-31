import { forwardRef, useMemo } from 'react'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * Is button loading?
   */
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = forwardRef(
  ({ children, loading = false, disabled = false, onClick, ...props }, ref) => {
    const isDisabled = useMemo(() => {
      return loading || disabled
    }, [loading, disabled])

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        onClick={isDisabled ? undefined : onClick}
        type="button"
        {...props}
      >
        {loading ? <span>loading</span> : <span>{children}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
