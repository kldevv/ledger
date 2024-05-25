import classNames from 'classnames'

import { LoadingBox } from '../../LoadingBox/LoadingBox'
import { ButtonCore, type ButtonCoreProps } from '../Button.Core/Button.Core'

import './Button.Text.css'

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
      className={classNames(`button-text-${variant}`, className)}
    >
      {label}
    </ButtonCore>
  )
}
