import classNames from 'classnames'
import React from 'react'

import { Icon } from '..'

import { DropdownOptions } from './Dropdown.Options/Dropdown.Options'
import {
  DropdownSelect,
  type DropdownSelectProps,
} from './Dropdown.Select/Dropdown.Select'

import type { OutlineIconProps, SolidIconProps } from '..'

export type DropdownItem<T> = {
  id: string
  value: T
  outlineIcon?: OutlineIconProps['name']
  solidIcon?: SolidIconProps['name']
  title: string
  desc?: string
}

export interface DropdownProps {
  /**
   * Error message
   */
  error?: string
  /**
   * Label
   */
  label?: string
  /**
   * Children
   */
  children: React.ReactElement
  /**
   * Overriding class name
   */
  className?: string
}

export const Dropdown = <ItemValue,>({
  label,
  error,
  children,
  className,
}: DropdownProps) => {
  return (
    <div className={classNames('w-full', className)}>
      {label != null && (
        <label className="text-gray whitespace-nowrap text-[0.625rem] font-medium">
          {label}
        </label>
      )}
      <div className="border-mid-gray w-full rounded-md border text-xs">
        {React.isValidElement<DropdownSelectProps<ItemValue>>(children) &&
          React.cloneElement(children, { className: 'px-2 py-1 rounded-md' })}
      </div>
      {error != null && (
        <div
          className={classNames(
            'text-dark-red/90 flex leading-4 text-[0.625rem] overflow-auto',
            className,
          )}
        >
          <span>
            <Icon.Solid
              name="ExclamationCircle"
              className="mt-1 size-[0.7rem]"
            />
          </span>
          <span className="ml-0.5">{error}</span>
        </div>
      )}
    </div>
  )
}

Dropdown.Select = DropdownSelect
Dropdown.Options = DropdownOptions
