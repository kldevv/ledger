import type {
  UseFormProps as ReactHookFormProps,
  FieldValues,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import type { z } from 'zod'

export interface UseFormProps<TFieldValues extends FieldValues>
  extends Omit<ReactHookFormProps<TFieldValues>, 'resolver'> {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema
}

export const useForm = <TFieldValues extends FieldValues>({
  schema,
  values,
  ...props
}: UseFormProps<TFieldValues>) => {
  const methods = useReactHookForm<TFieldValues>({
    // When set to all, all errors from each field will be gathered.
    criteriaMode: 'all',
    // Validation is triggered on both blur and change events.
    mode: 'all',
    shouldUnregister: true,
    ...props,
    values,
    resolver: zodResolver(schema),
  })

  const {
    formState: { isSubmitSuccessful },
    reset,
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(values)
    }
  }, [values, isSubmitSuccessful, reset])

  return methods
}
