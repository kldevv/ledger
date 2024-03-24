import classNames from 'classnames'
import { useSelect } from 'downshift'
import React from 'react'

import { Icon } from '../..'

import type { DropdownItem } from '../Dropdown'
import type { DropdownOptionsProps } from '../Dropdown.Options/Dropdown.Options'

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
}

export const DropdownSelect = <ItemValue,>({
  items,
  placeholder,
  children,
  className,
}: DropdownSelectProps<ItemValue>) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
  })

  return (
    <div className="relative w-full">
      <div
        className={classNames(
          'flex size-full cursor-pointer items-center justify-between bg-white whitespace-nowrap overflow-hidden',
          className,
        )}
        {...getToggleButtonProps()}
      >
        {selectedItem ? (
          <span>{selectedItem.title}</span>
        ) : (
          <span className="text-gray min-h-4 min-w-20 select-none">
            {placeholder}
          </span>
        )}
        <span className="px-2">
          <Icon.Outline
            name="ChevronDown"
            className={classNames('size-2 text-gray', {
              'transform rotate-180': isOpen,
            })}
          />
        </span>
      </div>
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
