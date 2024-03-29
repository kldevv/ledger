import { Brand } from './Icon.Brand'
import { Flag } from './Icon.Flag'
import { Outline } from './Icon.Outline'
import { Solid } from './Icon.Solid'

export type { SolidIconProps } from './Icon.Solid'
export type { OutlineIconProps } from './Icon.Outline'
export type { FlagIconProps } from './Icon.Flag'

export interface CoreSVGProps {
  /**
   * Override class name
   */
  className?: string
}

export const Icon = {
  Outline,
  Solid,
  Brand,
  Flag,
}
