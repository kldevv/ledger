import type {
  UseFormProps as ReactHookFormProps,
  FieldValues,
  DefaultValues,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import type { z } from 'zod'

export interface UseFormProps<TFieldValues extends FieldValues>
  extends Omit<ReactHookFormProps<TFieldValues>, 'resolver' | 'defaultValues'> {
  /**
   * Zod schema of the form fields.
   */
  schema: z.Schema
  /**
   * More constraint version of defaultValues
   */
  defaultValues: DefaultValues<TFieldValues>
}

export const useForm = <TFieldValues extends FieldValues>({
  schema,
  defaultValues,
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
    defaultValues,
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
