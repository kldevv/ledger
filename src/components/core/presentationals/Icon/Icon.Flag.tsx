import classNames from 'classnames'

import * as FlagSVG from './SVGs/Flag'

import type { CoreSVGProps } from './Icon'

export interface FlagIconProps extends CoreSVGProps {
  /**
   * Icon name
   */
  name: keyof typeof FlagSVG
}

export const Flag: React.FC<FlagIconProps> = ({ name, className }) => {
  // eslint-disable-next-line import/namespace
  const Icon = FlagSVG[name]

  return <Icon className={classNames('size-3', className)} />
}
