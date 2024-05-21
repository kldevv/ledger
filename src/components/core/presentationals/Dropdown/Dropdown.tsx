import classNames from 'classnames'
import React from 'react'

import { Icon, LoadingBox } from '..'

import { DropdownMultiSelect } from './Dorpdown.MultiSelect/Dorpdown.MultiSelect'
import { DropdownOptions } from './Dropdown.Options/Dropdown.Options'
import {
  DropdownSelect,
  type DropdownSelectProps,
} from './Dropdown.Select/Dropdown.Select'

import type { FlagIconProps, OutlineIconProps, SolidIconProps } from '..'
import type { EntryStatus } from '@/api/graphql'

export type DropdownItem<T> = {
  value: T
  outlineIcon?: OutlineIconProps['name']
  solidIcon?: SolidIconProps['name']
  flagIcon?: FlagIconProps['name']
  status?: EntryStatus
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
   * Custom class name
   */
  className?: string
  /**
   * Loading?
   */
  loading?: boolean
}

export const Dropdown = <ItemValue,>({
  label,
  error,
  children,
  className,
  loading = false,
}: DropdownProps) => {
  return (
    <div className={classNames('w-full', className)}>
      {label != null && (
        <label className="text-gray whitespace-nowrap text-[0.625rem] font-medium">
          {label}
        </label>
      )}
      <div className="flex h-8 w-full items-center">
        {loading ? (
          <LoadingBox className="size-full h-6" />
        ) : (
          <div className={'border-mid-gray w-full rounded-md border text-xs'}>
            {React.isValidElement<DropdownSelectProps<ItemValue>>(children) &&
              React.cloneElement(children, {
                className: 'px-2 py-1 rounded-md',
              })}
          </div>
        )}
      </div>
      {error != null && (
        <div className="text-dark-red/90 flex text-[0.625rem] leading-4">
          <span>
            <Icon.Solid
              name="ExclamationCircle"
              className="mt-0.5 size-[0.7rem]"
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
Dropdown.MultiSelect = DropdownMultiSelect
