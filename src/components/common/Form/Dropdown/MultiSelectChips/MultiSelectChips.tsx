import { PlusIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react'

import type { DropdownOption } from '..'

export interface MultiSelectChipsProps {
  /**
   * Values
   */
  values: Array<string>
  /**
   * Dropdown options
   */
  options: Array<DropdownOption>
}

export const MultiSelectChips: React.FC<MultiSelectChipsProps> = ({
  values,
  options,
}) => {
  const opts = useMemo(
    () =>
      values
        .slice(0, 2)
        .map((value) => {
          return options.find((option) => option.value === value)
        })
        .filter((value): value is DropdownOption => value != null),
    [options, values],
  )

  return (
    <div className="text-dark-shades flex space-x-2 text-sm font-normal">
      {opts.map(({ value, label }) => {
        return (
          <div key={value} className="bg-mid-gray rounded p-1">
            {label}
          </div>
        )
      })}
      {values.length > 2 && (
        <div className="bg-mid-gray flex items-center rounded p-1">
          <PlusIcon className="size-4" />
          {values.length - 2}
        </div>
      )}
    </div>
  )
}
