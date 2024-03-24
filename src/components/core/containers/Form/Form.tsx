import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'

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
        {children}
      </form>
    </FormProvider>
  )
}
