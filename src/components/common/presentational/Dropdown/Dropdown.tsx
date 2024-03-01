import { Listbox } from '@headlessui/react'
import { useMemo } from 'react'

import { Label } from './Dropdown.Label'
import { Options, type OptionsProps } from './Dropdown.Options'
import { Trigger } from './Dropdown.Trigger'

export interface DropdownProps {
  /**
   * Value
   */
  value: string | string[]
  /**
   * Options
   */
  options: OptionsProps['options']
  /**
   * On value change
   */
  onChange: (value: string) => null
  /**
   * On blur
   */
  onBlur: () => null
  /**
   * Label
   */
  label: string
  /**
   * Is loading?
   */
  loading?: boolean
  /**
   * Is multiple selection
   */
  multiple?: boolean
  /**
   * Name
   */
  name: string
  /**
   * Is disable?
   */
  disable?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  value,
  multiple = false,
  ...props
}: DropdownProps) => {
  const display = useMemo(() => {
    return multiple
      ? options.find((option) => option.value === value)?.label
      : options
          .filter((option) => value.includes(option.value))
          .map(({ label }) => label)
  }, [multiple, options, value])

  return (
    <Listbox {...props} value={value} multiple={multiple}>
      {({ open }) => (
        <div className="relative flex w-full flex-col">
          <Label label={label} />
          <Trigger open={open} display={display} />
          <Options options={options} />
        </div>
      )}
    </Listbox>
  )
}
