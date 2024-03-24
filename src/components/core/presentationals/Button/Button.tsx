import classNames from 'classnames'
import { forwardRef } from 'react'

import { ButtonCore } from './Button.Core/Button.Core'

import type { ButtonCoreProps } from './Button.Core/Button.Core'

export interface ButtonProps extends ButtonCoreProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className }, ref) => {
    return (
      <div
        className={classNames(
          'bg-light-accent text-light-shades hover:bg-light-accent/90 w-fit rounded-md text-xs',
          className,
        )}
      >
        <ButtonCore ref={ref} className="px-2 py-1.5">
          {children}
        </ButtonCore>
      </div>
    )
  },
)

Button.displayName = 'Button'
