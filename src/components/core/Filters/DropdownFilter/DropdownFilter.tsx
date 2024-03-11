import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { useMemo } from 'react'

export interface DropdownFilterProps<
  TData extends string | number,
  TValue = TData | null,
> {
  /**
   * Dropdown options
   */
  options:
    | { value: TValue; label: React.ReactNode }[]
    | { value: TData; label: React.ReactNode }[]
  /**
   * On change
   */
  onChange: ((value: TValue) => void) | ((value: TData) => void)
  /**
   * Current value
   */
  value: TValue | TData
}

export const DropdownFilter = <TData extends string | number>({
  options,
  value,
  onChange,
}: DropdownFilterProps<TData>) => {
  const displayValue = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [options, value],
  )

  return (
    <Listbox
      as="div"
      className="relative flex justify-start"
      value={value}
      onChange={onChange}
    >
      {({ open }) => (
        <>
          <Listbox.Button>
            <div className="border-mid-gray flex flex-auto items-center rounded-md border px-4 py-2 font-medium">
              <div className="text-dark-shades truncate pr-12 text-xs">
                {displayValue}
              </div>
              <div className="text-gray">
                {open ? (
                  <ChevronUpIcon className="size-5" />
                ) : (
                  <ChevronDownIcon className="size-5" />
                )}
              </div>
            </div>
          </Listbox.Button>
          <Listbox.Options className="border-mid-gray absolute z-30 mt-9 flex flex-col items-start justify-center space-y-2 rounded-md border bg-white px-4 py-1 shadow">
            {options.map(({ value, label }) => (
              <Listbox.Option key={value} value={value} as={React.Fragment}>
                {({ active }) => (
                  <li
                    className={classNames(
                      'cursor-pointer text-left',
                      active ? 'text-light-accent' : 'text-dark-shades',
                    )}
                  >
                    <div className="truncate pr-12 text-left text-xs font-medium leading-6">
                      {label}
                    </div>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  )
}
