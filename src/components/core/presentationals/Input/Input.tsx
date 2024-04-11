import classNames from 'classnames'
import React from 'react'

import { Icon } from '..'

import { InputDate } from './Input.Date/Input.Date'
import { InputMoney } from './Input.Money/Input.Money'
import { InputStatic } from './Input.Static/Input.Static'
import { InputText } from './Input.Text/Input.Text'

import type { InputDateProps } from './Input.Date/Input.Date'
import type { InputMoneyProps } from './Input.Money/Input.Money'
import type { InputStaticProps } from './Input.Static/Input.Static'
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
          'border-mid-gray w-full rounded-md border bg-white px-2 py-1 text-xs flex',
          className,
        )}
      >
        {React.isValidElement<
          InputTextProps | InputDateProps | InputStaticProps | InputMoneyProps
        >(children) && children}
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
Input.Date = InputDate
Input.Money = InputMoney
