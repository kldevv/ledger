import classNames from 'classnames'

import * as SolidSVG from './SVGs/Solid'

import type { CoreSVGProps } from './Icon'

export interface SolidSVGProps extends CoreSVGProps {
  /**
   * Override stroke width
   */
  stroke?: number
}

export interface SolidIconProps extends SolidSVGProps {
  /**
   * Icon name
   */
  name: keyof typeof SolidSVG
}

export const Solid: React.FC<SolidIconProps> = ({ name, className }) => {
  const Icon = SolidSVG[name]

  return <Icon className={classNames('size-5', className)} />
}
