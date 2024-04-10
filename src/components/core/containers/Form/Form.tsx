import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'

import { FormDate } from './Form.Date/Form.Date'
import { FormDropdown } from './Form.Dropdown/Form.Dropdown'
import { FormInput } from './Form.Input/Form.Input'
import { FormMultiSelect } from './Form.MultiDropdown/Form.MultiSelect'
import { FormStatic } from './Form.Static/Form.Static'
import { FormSubmit } from './Form.Submit/Form.Submit'

export interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /**
   * Children component
   */
  children: React.ReactNode
  /**
   * Callback on submit event
   */
  onSubmit: SubmitHandler<TFieldValues>
  /**
   * React hook form returns
   */
  context: UseFormReturn<TFieldValues>
}

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  context,
  className,
  ...props
}: FormProps<TFieldValues>) => {
  const { handleSubmit } = context

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      void handleSubmit(onSubmit)(event)
    },
    [handleSubmit, onSubmit],
  )

  return (
    <FormProvider {...context}>
      <form {...props} className="w-full" onSubmit={handleOnSubmit}>
        <div className={className}>{children}</div>
      </form>
    </FormProvider>
  )
}

Form.Date = FormDate
Form.Input = FormInput
Form.Static = FormStatic
Form.Dropdown = FormDropdown
Form.MultiSelect = FormMultiSelect
Form.Submit = FormSubmit
