import classNames from 'classnames'
import React from 'react'

import { Icon } from '..'

import { InputStatic } from './Input.Static/Input.Static'
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
    <div className="w-full">
      {label != null && (
        <label className="text-gray whitespace-nowrap text-[0.625rem] font-medium">
          {label}
        </label>
      )}
      <div
        className={classNames(
          'border-mid-gray w-full min-w-32 rounded-md border bg-white px-2 py-1 text-xs',
          className,
        )}
      >
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
Input.Static = InputStatic
