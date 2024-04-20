import classNames from 'classnames'
import { forwardRef } from 'react'

import { Spinner } from '..'

import { ButtonCore } from './Button.Core/Button.Core'

import type { ButtonCoreProps } from './Button.Core/Button.Core'

export * from './Button.Core/Button.Core'

export interface ButtonProps extends ButtonCoreProps {
  /**
   * Is loading?
   */
  loading?: boolean
  /**
   * Color
   */
  color?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled = false, loading = false, color, ...props },
    ref,
  ) => {
    return (
      <div
        className={classNames(
          ' w-fit rounded-md text-xs size-full',
          color != null
            ? color
            : disabled || loading
              ? 'bg-light-accent/20 text-light-shades'
              : 'hover:bg-light-accent/80 bg-light-accent text-light-shades',
          className,
        )}
      >
        {loading ? (
          <div className="flex size-full items-center justify-center px-6 py-1.5">
            <Spinner className="size-3" />
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
