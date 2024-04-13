import { useCallback } from 'react'
import { useController, type FieldValues, type Path } from 'react-hook-form'

import { useFormError } from '@/components/core/hooks'
import { Dropdown } from '@/components/core/presentationals'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseMultipleSelectionSelectedItemsChange } from 'downshift'

export interface FormMultiSelectProps<
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
  /**
   * Is loading?
   */
  loading?: boolean
}

export const FormMultiSelect = <TFieldValues extends FieldValues, ItemValue>({
  name,
  label,
  placeholder,
  items,
  loading = false,
}: FormMultiSelectProps<TFieldValues, ItemValue>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  const errorMsg = useFormError(error)

  const handleOnChange = useCallback(
    (
      change: UseMultipleSelectionSelectedItemsChange<DropdownItem<ItemValue>>,
    ) => {
      onChange(change.selectedItems.map(({ value }) => value))
    },
    [onChange],
  )

  return (
    <Dropdown error={errorMsg} label={label}>
      <Dropdown.MultiSelect
        onChange={handleOnChange}
        value={value}
        placeholder={placeholder}
        items={items}
        className="min-h-5"
      >
        <Dropdown.Options loading={loading} />
      </Dropdown.MultiSelect>
    </Dropdown>
  )
}
