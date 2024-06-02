import clsx from 'clsx'
import React from 'react'

import { Icon } from '../..'
import { useDropdownState } from '../Dropdown.State/Dropdown.State'

export interface DropdownTriggerProps {
  /**
   * Placeholder
   */
  placeholder?: string
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  placeholder,
}) => {
  const { isOpen, getToggleButtonProps, selected } = useDropdownState()

  return (
    <button
      className={clsx(
        'flex size-full max-w-full cursor-pointer items-center overflow-hidden rounded-md bg-white px-2 py-1',
        {
          'outline outline-light-accent': isOpen,
        },
      )}
      data-testid="dropdown-trigger"
      {...getToggleButtonProps()}
    >
      {/* Selected value */}
      {selected && (
        <span className="flex grow select-none items-center gap-x-2 truncate">
          {selected.icon && (
            <span className="min-w-fit">
              <Icon name={selected.icon} className="size-2.5" />
            </span>
          )}
          <span className="truncate">{selected.label}</span>
        </span>
      )}

      {/* Placeholder */}
      {!selected && (
        <span className="text-gray flex w-full grow select-none truncate">
          {placeholder}
        </span>
      )}

      <span className="ml-auto shrink-0 pl-1">
        <Icon
          name="ChevronUp"
          className={clsx('text-gray size-3', {
            'rotate-180': !isOpen,
          })}
        />
      </span>
    </button>
  )
}
