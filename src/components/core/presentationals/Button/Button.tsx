import classNames from 'classnames'
import { forwardRef } from 'react'

import { ButtonCore } from './Button.Core/Button.Core'
import { ButtonSpinner } from './Button.Spinner/Button.Spinner'

import type { ButtonCoreProps } from './Button.Core/Button.Core'

export interface ButtonProps extends ButtonCoreProps {
  /**
   * Is loading?
   */
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled = false, loading = false, ...props },
    ref,
  ) => {
    return (
      <div
        className={classNames(
          ' text-light-shades w-fit rounded-md text-xs',
          disabled || loading
            ? 'bg-mid-gray'
            : 'hover:bg-light-accent/90 bg-light-accent',
          className,
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center px-6 py-1.5">
            <ButtonSpinner className="size-3" />
          </div>
        ) : (
          <ButtonCore
            ref={ref}
            className="px-2 py-1.5"
            {...props}
            disabled={disabled}
          >
            {children}
          </ButtonCore>
        )}
      </div>
    )
  },
)

Button.displayName = 'Button'
