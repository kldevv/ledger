import classNames from 'classnames'

import * as BrandSVG from './SVGs/Brand'

import type { CoreSVGProps } from './Icon'

export interface BrandIconProps extends CoreSVGProps {
  /**
   * Icon name
   */
  name: keyof typeof BrandSVG
}

export const Brand: React.FC<BrandIconProps> = ({ name, className }) => {
  const Icon = BrandSVG[name]

  return <Icon className={classNames('size-5', className)} />
}
