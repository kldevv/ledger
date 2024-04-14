import { Icon } from '../../Icon/Icon'
import { StatusIndicator } from '../../StatusIndicator/StatusIndicator'

import type { FlagIconProps } from '../../Icon/Icon.Flag'
import type { OutlineIconProps } from '../../Icon/Icon.Outline'
import type { SolidIconProps } from '../../Icon/Icon.Solid'
import type { EntryStatus } from '@/api/graphql'

export interface DropdownIconProps {
  outlineIcon?: OutlineIconProps['name']
  solidIcon?: SolidIconProps['name']
  flagIcon?: FlagIconProps['name']
  status?: EntryStatus
}

export const DropdownIcon: React.FC<DropdownIconProps> = ({
  outlineIcon,
  solidIcon,
  flagIcon,
  status,
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
      ) : status != null ? (
        <span className="min-w-fit">
          <StatusIndicator status={status} />
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
