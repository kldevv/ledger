import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React from 'react'

export interface OptionProps {
  /**
   * Display value
   */
  label: React.ReactNode
  /**
   * Value
   */
  value: string
}

export const Option: React.FC<OptionProps> = ({ label, value }) => {
  return (
    <Listbox.Option key={value} value={value} as={React.Fragment}>
      {({ active, selected }) => (
        <li
          className={classNames(
            'space-x-2 py-1.5 px-3 w-full flex items-center',
            { 'bg-mid-gray rounded': active },
          )}
        >
          {label}
          {selected && <CheckIcon className="size-5" />}
        </li>
      )}
    </Listbox.Option>
  )
}
