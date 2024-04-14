import classNames from 'classnames'
import { useSelect } from 'downshift'
import React from 'react'

import { Icon } from '../..'
import { DropdownIcon } from '../Dropdown.Icon/Dropdown.Icon'

import type { DropdownItem } from '../Dropdown'
import type { DropdownOptionsProps } from '../Dropdown.Options/Dropdown.Options'
import type { UseSelectSelectedItemChange } from 'downshift'

export interface DropdownSelectProps<ItemValue> {
  /**
   * Items
   */
  items: DropdownItem<ItemValue>[]
  /**
   * Placeholder
   */
  placeholder?: string
  /**
   * Overide className
   */
  className?: string
  /**
   * Children
   */
  children: React.ReactNode
  /**
   * On change
   */
  onChange?: (
    change: UseSelectSelectedItemChange<DropdownItem<ItemValue>>,
  ) => void
  /**
   * Value
   */
  value?: DropdownItem<ItemValue>
}

export const DropdownSelect = <ItemValue,>({
  items,
  placeholder,
  children,
  className,
  onChange,
  value,
}: DropdownSelectProps<ItemValue>) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<DropdownItem<ItemValue>>({
    items,
    onSelectedItemChange: onChange,
    selectedItem: value ?? null,
    itemToString: (item) => item?.title ?? '',
  })

  return (
    <div className="relative w-full">
      <span
        className={classNames(
          'flex size-full max-w-full overflow-hidden cursor-pointer items-center bg-white',
          className,
          {
            'outline outline-light-accent': isOpen,
          },
        )}
        {...getToggleButtonProps()}
      >
        {selectedItem && (
          <span className="flex grow select-none items-center gap-x-2 truncate">
            <DropdownIcon {...selectedItem} />
            <span className="truncate">{selectedItem.title}</span>
          </span>
        )}
        {!selectedItem && (
          <span className="text-gray flex w-full grow select-none truncate">
            {placeholder}
          </span>
        )}
        <span className="ml-auto shrink-0 pl-1">
          <Icon.Solid
            name="ChevronUp"
            className={classNames('size-1.5 text-gray', {
              'transform rotate-180': !isOpen,
            })}
          />
        </span>
      </span>
      {React.isValidElement<DropdownOptionsProps<ItemValue>>(children) &&
        React.cloneElement(children, {
          getMenuProps,
          highlightedIndex,
          getItemProps,
          isOpen,
          selectedItem,
          items,
        })}
    </div>
  )
}
