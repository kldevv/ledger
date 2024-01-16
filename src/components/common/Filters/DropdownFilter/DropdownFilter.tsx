import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { useMemo } from 'react'

export interface DropdownFilterProps<
  TData extends string,
  TValue = TData | null,
> {
  /**
   * Dropdown options
   */
  options: { value: TValue; label: React.ReactNode }[]
  /**
   * On change
   */
  onChange: (value: TValue) => void
  /**
   * Current value
   */
  value: TValue
}

export const DropdownFilter = <TData extends string>({
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
            <div className="flex flex-auto py-2 px-4 rounded-md font-medium border border-mid-gray items-center">
              <div className="whitespace-nowrap pr-12 overflow-hidden overflow-ellipsis text-dark-shades text-xs">
                {displayValue}
              </div>
              <div className="text-gray">
                {open ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </div>
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute z-30 px-4 mt-9 bg-white border border-mid-gray shadow rounded-md py-1 flex flex-col space-y-2 items-start justify-center">
            {options.map(({ value, label }) => (
              <Listbox.Option key={value} value={value} as={React.Fragment}>
                {({ active }) => (
                  <li
                    className={classNames(
                      'cursor-pointer text-left',
                      active ? 'text-light-accent' : 'text-dark-shades',
                    )}
                  >
                    <div className="whitespace-nowrap pr-12 overflow-hidden overflow-ellipsis text-xs leading-6 font-medium text-left">
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
