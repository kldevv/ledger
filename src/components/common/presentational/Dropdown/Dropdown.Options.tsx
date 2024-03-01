import { Listbox } from '@headlessui/react'

import { Option } from './Dropdown.Option'

import type { OptionProps } from './Dropdown.Option'

export interface OptionsProps {
  /**
   * Options
   */
  options: OptionProps[]
}

export const Options: React.FC<OptionsProps> = ({ options }) => {
  return (
    <Listbox.Options className="shadow-gray absolute z-10 w-full overflow-auto rounded-md bg-white p-1 shadow-md">
      {options.map((option) => (
        <Option {...option} key={option.value} />
      ))}
    </Listbox.Options>
  )
}
