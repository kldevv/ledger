import classNames from 'classnames'
import { useMultipleSelection, useSelect } from 'downshift'
import React, { useCallback } from 'react'

import { ButtonCore, Icon } from '../..'
import { DropdownIcon } from '../Dropdown.Icon/Dropdown.Icon'

import type { DropdownItem } from '../Dropdown'
import type { DropdownOptionsProps } from '../Dropdown.Options/Dropdown.Options'
import type { UseMultipleSelectionSelectedItemsChange } from 'downshift'

export interface DropdownMultiSelectProps<ItemValue> {
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
    change: UseMultipleSelectionSelectedItemsChange<DropdownItem<ItemValue>>,
  ) => void
  /**
   * Value
   */
  value?: DropdownItem<ItemValue>[]
}

export const DropdownMultiSelect = <ItemValue,>({
  items,
  placeholder,
  children,
  className,
  onChange,
  value,
}: DropdownMultiSelectProps<ItemValue>) => {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<DropdownItem<ItemValue>>({
    selectedItems: value ?? [],
    onSelectedItemsChange: onChange,
  })
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
          }
      }
      return changes
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (newSelectedItem && !selectedItems.includes(newSelectedItem)) {
            addSelectedItem(newSelectedItem)
          }
          break
        default:
          break
      }
    },
    itemToString: (item) => item?.title ?? '',
  })

  const handleRemoveSelectedItem = useCallback(
    (selectedItem: DropdownItem<ItemValue>) =>
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        removeSelectedItem(selectedItem)
      },
    [removeSelectedItem],
  )

  return (
    <div className="relative w-full">
      <div
        className={classNames(
          'flex size-full cursor-pointer items-center justify-start bg-white gap-2',
          className,
          {
            'outline outline-light-accent': isOpen,
          },
        )}
        {...getToggleButtonProps(
          getDropdownProps({ preventKeyAction: isOpen }),
        )}
      >
        {selectedItems.length > 0 && (
          <span className="flex grow select-none items-center gap-x-2 truncate">
            {selectedItems.map((selectedItem, index) => (
              <span
                key={selectedItem.title}
                className="bg-light-accent/20 flex shrink cursor-default items-center gap-x-1 truncate rounded p-1"
                {...getSelectedItemProps({
                  selectedItem: selectedItem,
                  index,
                })}
              >
                <DropdownIcon {...selectedItem} />
                <span className="truncate">{selectedItem.title}</span>
                <ButtonCore
                  className="hover:text-dark-shades/60 text-dark-shades w-fit"
                  onClick={handleRemoveSelectedItem(selectedItem)}
                >
                  <Icon.Solid name="XMark" className="size-2.5" />
                </ButtonCore>
              </span>
            ))}
          </span>
        )}
        {selectedItems.length === 0 && (
          <span className="text-gray flex w-full grow select-none truncate">
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
          selectedItems,
          items,
        })}
    </div>
  )
}
