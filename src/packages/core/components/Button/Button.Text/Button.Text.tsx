import clsx from 'clsx'

import { LoadingBox } from '../../LoadingBox/LoadingBox'
import { ButtonCore, type ButtonCoreProps } from '../Button.Core/Button.Core'

export interface ButtonTextProps extends Omit<ButtonCoreProps, 'children'> {
  /**
   * Button label
   */
  label: string
  /**
   * Variant
   */
  variant: 'primary' | 'secondary'
}

export const ButtonText: React.FC<ButtonTextProps> = ({
  label,
  loading = false,
  className,
  variant,
  ...props
}) => {
  if (loading) {
    return <LoadingBox className="h-full w-20" />
  }

  return (
    <ButtonCore
      {...props}
      className={clsx(linkTextVariant[variant], className)}
    >
      {label}
    </ButtonCore>
  )
}

const linkTextVariant = {
  primary: 'text-light-accent hover:text-light-accent/60',
  secondary: 'text-dark-shades hover:text-dark-shades/60',
} as const
