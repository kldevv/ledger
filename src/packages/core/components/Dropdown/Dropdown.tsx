import { useSelect } from 'downshift'
import { useCallback } from 'react'

import { Error, Label, LoadingBox } from '..'

import { DropdownMenu } from './Dropdown.Menu/Dropdown.Menu'
import {
  DropdownStateContext,
  type DropdownState,
} from './Dropdown.State/Dropdown.State'
import { DropdownTrigger } from './Dropdown.Trigger/Dropdown.Trigger'

import type { DropdownItem } from './Dropdown.Item/Dropdown.Item'
import type { UseSelectSelectedItemChange } from 'downshift'

export interface DropdownProps
  extends Pick<DropdownState, 'menuLoading' | 'error' | 'triggerLoading'> {
  /**
   * Label
   */
  label?: string
  /**
   * Placeholder
   */
  placeholder?: string
  /**
   * Class name
   */
  className?: string
  /**
   * On change
   */
  onChange: (change: DropdownItem | null) => void
  /**
   * Initial value
   */
  value: DropdownItem | null
  /**
   * Items
   */
  items: DropdownItem[]
}

export const Dropdown: React.FC<DropdownProps> = ({
  error,
  triggerLoading = false,
  menuLoading = false,
  label,
  onChange,
  placeholder,
  value,
  items,
  className,
}: DropdownProps) => {
  const handleOnChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem | null>) =>
      onChange(change.selectedItem),
    [onChange],
  )

  const { getLabelProps, selectedItem, ...props } =
    useSelect<DropdownItem | null>({
      items,
      onSelectedItemChange: handleOnChange,
      selectedItem: value,
      itemToString: (item) => item?.label ?? '',
    })

  return (
    <DropdownStateContext.Provider
      value={{
        selected: selectedItem,
        error,
        triggerLoading,
        menuLoading,
        ...props,
      }}
    >
      <div className={className}>
        <Label t={label} getLabelProps={getLabelProps} />
        <div className="flex h-8 w-full items-center">
          {/* Loading trigger */}
          {triggerLoading && <LoadingBox className="size-full h-6" />}

          {/* Input */}
          {!triggerLoading && (
            <div
              className={
                'border-mid-gray relative w-full rounded-md border text-xs'
              }
            >
              <DropdownTrigger placeholder={placeholder} />
              <DropdownMenu items={items} />
            </div>
          )}
        </div>
        <Error e={error} />
      </div>
    </DropdownStateContext.Provider>
  )
}
