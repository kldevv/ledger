import type { FieldValues, Path } from 'react-hook-form'

import { useCallback } from 'react'
import { useController } from 'react-hook-form'

import { useFormError } from '@/components/core/hooks'
import { Dropdown } from '@/components/core/presentationals'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export interface FormDropdownProps<
  TFieldValues extends FieldValues,
  ItemValue,
> {
  /**
   * Input label
   */
  label?: string
  /**
   * Input name
   */
  name: Path<TFieldValues>
  /**
   * Input placeholder
   */
  placeholder?: string
  /**
   * Items
   */
  items: DropdownItem<ItemValue>[]
}

export const FormDropdown = <TFieldValues extends FieldValues, ItemValue>({
  name,
  label,
  placeholder,
  items,
}: FormDropdownProps<TFieldValues, ItemValue>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  const errorMsg = useFormError(error)

  const handleOnChange = useCallback(
    (change: UseSelectSelectedItemChange<DropdownItem<ItemValue>>) =>
      onChange(change?.selectedItem.value),
    [onChange],
  )

  return (
    <Dropdown error={errorMsg} label={label}>
      <Dropdown.Select
        onChange={handleOnChange}
        value={items.find((item) => item.value === value)}
        placeholder={placeholder}
        items={items}
        className="h-5"
      >
        <Dropdown.Options />
      </Dropdown.Select>
    </Dropdown>
  )
}
