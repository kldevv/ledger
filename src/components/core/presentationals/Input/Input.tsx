import classNames from 'classnames'
import React from 'react'

import { Icon } from '..'

import { InputText } from './Input.Text/Input.Text'

export interface InputProps {
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

export const Input = ({ children, error, label, className }: InputProps) => {
  return (
    <div className="w-min">
      {label != null && (
        <div>
          <label className="text-gray text-[0.625rem] font-medium">
            {label}
          </label>
        </div>
      )}
      <div className="border-mid-gray w-fit rounded-md border px-2 py-1 text-xs">
        {children}
      </div>
      {error != null && (
        <div
          className={classNames(
            'text-dark-red/90 flex leading-4 text-[0.625rem]',
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

Input.Text = InputText
