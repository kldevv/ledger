import classNames from 'classnames'

import * as OutlineSVG from './SVGs/Outline'

import type { CoreSVGProps } from './Icon'

export interface OutlineSVGProps extends CoreSVGProps {
  /**
   * Override stroke width
   */
  stroke?: number
}

export interface OutlineIconProps extends OutlineSVGProps {
  /**
   * Icon name
   */
  name: keyof typeof OutlineSVG
}

export const Outline: React.FC<OutlineIconProps> = ({
  name,
  className,
  stroke,
}) => {
  // eslint-disable-next-line import/namespace
  const Icon = OutlineSVG[name]

  return (
    <Icon className={classNames('size-5', className)} stroke={stroke ?? 2} />
  )
}
