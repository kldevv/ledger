import type { Control, FieldValues, Path } from 'react-hook-form'

import { useCallback } from 'react'
import { useController } from 'react-hook-form'

import { InputCore, ErrorMessage, Label } from '@/components/common'
import { formatDate } from '@/shared'

export interface InputDateProps<TFieldValues extends FieldValues>
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'onBur'
  > {
  /**
   * Input label
   */
  label: string
  /**
   * Input name
   */
  name: Path<TFieldValues>
  /**
   * Form control
   */
  control?: Control<TFieldValues>
}

export const InputDate = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  ...props
}: InputDateProps<TFieldValues>) => {
  const {
    field: { value, ...rest },
    fieldState: { error, isTouched },
  } = useController({
    name,
    control,
  })

  const convertValue = useCallback((value: Date | string) => {
    if (typeof value === 'string') return value

    return formatDate(value)
  }, [])

  return (
    <div className="flex w-full min-w-fit flex-col">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <InputCore
        {...props}
        {...rest}
        value={convertValue(value)}
        type="date"
        max="2999-12-31"
        className={
          isTouched
            ? error == null
              ? 'border-green'
              : 'border-red'
            : undefined
        }
        id={`input-${name}`}
      />
      <ErrorMessage error={error?.message} />
    </div>
  )
}
