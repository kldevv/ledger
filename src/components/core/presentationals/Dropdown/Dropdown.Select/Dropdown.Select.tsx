import classNames from 'classnames'
import { useSelect } from 'downshift'
import React from 'react'

import { Icon } from '../..'

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
  } = useSelect({
    items,
    onSelectedItemChange: onChange,
    selectedItem: value ?? null,
    itemToString: (item) => item?.title ?? '',
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
          <span className="flex items-center gap-2">
            {selectedItem?.outlineIcon != null ? (
              <Icon.Outline
                name={selectedItem.outlineIcon}
                className="size-2.5"
              />
            ) : selectedItem?.solidIcon != null ? (
              <Icon.Solid name={selectedItem.solidIcon} className="size-2.5" />
            ) : (
              selectedItem.flagIcon && (
                <Icon.Flag name={selectedItem.flagIcon} className="size-2.5" />
              )
            )}
            {selectedItem.title}
          </span>
        ) : (
          <span className="text-gray min-h-4 min-w-20 select-none">
            {placeholder}
          </span>
        )}
        <span className="px-2">
          <Icon.Solid
            name="ChevronUp"
            className={classNames('size-1.5 text-gray', {
              'transform rotate-180': !isOpen,
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
