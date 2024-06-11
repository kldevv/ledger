import clsx from 'clsx'

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

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
} = ({ className, variant, loading = false, children, ...props }) => (
  <ButtonCore
    {...props}
    className={clsx(
      ButtonVariant[variant],
      'flex size-full min-h-full items-center justify-center rounded-md px-3 py-1',
      className,
    )}
  >
    {loading ? <LoadingSpinner className="size-4" /> : children}
  </ButtonCore>
)

Button.Text = ButtonText

const ButtonVariant = {
  primary:
    'border-2 bg-light-accent hover:bg-light-accent/60 text-light-shades',
  secondary:
    'border-2 border-light-accent hover:bg-light-accent/10 text-light-accent',
} as const
