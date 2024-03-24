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
}

export const Input = ({ children, error, label }: InputProps) => {
  return (
    <div className="w-min">
      {label != null && (
        <label className="text-gray text-[0.625rem]">{label}</label>
      )}
      <div className="border-mid-gray w-fit rounded-md border px-2 py-1 text-xs">
        {children}
      </div>
      {error != null && (
        <div className="text-dark-red/90 flex items-center text-[0.625rem]">
          <Icon.Solid name="ExclamationCircle" className="size-[0.7rem]" />
          <div className="ml-0.5">{error}</div>
        </div>
      )}
    </div>
  )
}

Input.Text = InputText
