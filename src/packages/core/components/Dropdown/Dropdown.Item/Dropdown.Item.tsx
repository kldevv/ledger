import clsx from 'clsx'
import { useMemo } from 'react'

import { Icon } from '../..'
import { useDropdownState } from '../Dropdown.State/Dropdown.State'

import type { IconProps } from '../..'

export type DropdownItem = {
  /**
   * Value
   */
  value: string
  /**
   * Label
   */
  label: string
  /**
   * Icon
   */
  icon?: IconProps['name']
  /**
   * Description
   */
  desc?: string
}

export interface DropdownItemProps extends DropdownItem {
  /**
   * Number
   */
  index: number
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  index,
  ...item
}) => {
  const { highlightedIndex, selected, getItemProps } = useDropdownState()

  const itemSelected = useMemo(
    () =>
      Array.isArray(selected) ? selected.includes(item) : selected === item,
    [item, selected],
  )

  return (
    <div
      className={clsx(
        highlightedIndex === index && 'bg-mid-gray/50',
        'flex cursor-pointer select-none flex-col p-2',
        {
          'font-semibold': itemSelected,
        },
      )}
      data-testid="dropdown-item"
      {...getItemProps?.({ item, index })}
    >
      <div className="flex items-center gap-2">
        {item.icon && (
          <span className="min-w-fit">
            <Icon name={item.icon} className="size-2.5" />
          </span>
        )}
        {item.label}
      </div>
      {item.desc != null && (
        <div className="text-gray mt-1 text-[0.625rem] leading-4">
          {item.desc}
        </div>
      )}
    </div>
  )
}
