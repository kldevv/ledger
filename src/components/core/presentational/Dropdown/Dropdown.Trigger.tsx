import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import React from 'react'

export interface TriggerProps {
  /**
   * Is dropdown open?
   */
  open: boolean
  /**
   * Display value
   */
  display: React.ReactNode
}

export const Trigger: React.FC<TriggerProps> = ({ open, display }) => {
  return (
    <Listbox.Button className="border-mid-gray flex h-[2.5rem] w-full items-center rounded-md border bg-white px-3 py-1.5 text-sm font-normal outline-none">
      <div className="relative flex h-[30px] w-full items-center">
        <div className="mr-[1.75rem] w-full truncate text-left">{display}</div>
        <div className="text-gray absolute right-1">
          {open ? (
            <ChevronUpIcon className="size-5" />
          ) : (
            <ChevronDownIcon className="size-5" />
          )}
        </div>
      </div>
    </Listbox.Button>
  )
}
