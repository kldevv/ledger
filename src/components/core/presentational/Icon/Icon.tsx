import { Brand } from './Icon.Brand'
import { Outline } from './Icon.Outline'
import { Solid } from './Icon.Solid'

export type { SolidIconProps } from './Icon.Solid'
export type { OutlineIconProps } from './Icon.Outline'

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
}
