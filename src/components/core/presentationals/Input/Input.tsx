import classNames from 'classnames'
import React from 'react'

import { Icon } from '..'

import { InputText } from './Input.Text/Input.Text'

import type { InputTextProps } from './Input.Text/Input.Text'

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
    <div className={classNames('w-full', className)}>
      {label != null && (
        <label className="text-gray whitespace-nowrap text-[0.625rem] font-medium">
          {label}
        </label>
      )}
      <div className="border-mid-gray w-full min-w-32 rounded-md border px-2 py-1 text-xs">
        {React.isValidElement<InputTextProps>(children) && children}
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

Input.Text = InputText
