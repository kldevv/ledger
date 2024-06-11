import clsx from 'clsx'
import React from 'react'

import { LoadingBox } from '../LoadingBox/LoadingBox'

import { ButtonCore } from './Button.Core/Button.Core'
import { ButtonText } from './Button.Text/Button.Text'

import type { ButtonCoreProps } from './Button.Core/Button.Core'

export interface ButtonProps extends ButtonCoreProps {
  /**
   * Variant
   */
  variant: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> & {
  Text: typeof ButtonText
} = ({ className, variant, loading = false, ...props }) => {
  if (loading) {
    return <LoadingBox className="size-full" />
  }

  return (
    <ButtonCore
      {...props}
      className={clsx(
        ButtonVariant[variant],
        'rounded-md px-3 py-1',
        className,
      )}
    />
  )
}

Button.Text = ButtonText

const ButtonVariant = {
  primary:
    'border-2 bg-light-accent hover:bg-light-accent/60 text-light-shades',
  secondary:
    'border-2 border-light-accent hover:bg-light-accent/10 text-light-accent',
} as const
