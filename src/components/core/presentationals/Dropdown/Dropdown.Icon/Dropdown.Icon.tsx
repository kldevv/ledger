import { Icon } from '../../Icon/Icon'

import type { FlagIconProps } from '../../Icon/Icon.Flag'
import type { OutlineIconProps } from '../../Icon/Icon.Outline'
import type { SolidIconProps } from '../../Icon/Icon.Solid'

export interface DropdownIconProps {
  outlineIcon?: OutlineIconProps['name']
  solidIcon?: SolidIconProps['name']
  flagIcon?: FlagIconProps['name']
}

export const DropdownIcon: React.FC<DropdownIconProps> = ({
  outlineIcon,
  solidIcon,
  flagIcon,
}) => {
  return (
    <>
      {outlineIcon != null ? (
        <span className="min-w-fit">
          <Icon.Outline name={outlineIcon} className="size-2.5" />
        </span>
      ) : solidIcon != null ? (
        <span className="min-w-fit">
          <Icon.Solid name={solidIcon} className="size-2.5" />
        </span>
      ) : (
        flagIcon && (
          <span className="min-w-fit">
            <Icon.Flag name={flagIcon} className="size-2.5" />
          </span>
        )
      )}
    </>
  )
}
