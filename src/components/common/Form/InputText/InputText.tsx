import type { Control, FieldValues, Path } from 'react-hook-form'

import { useController } from 'react-hook-form'

import { ErrorMessage, InputCore, Label } from '@/components/common'

import type { InputCoreProps } from '@/components/common'

export interface InputTextProps<TFieldValues extends FieldValues>
  extends Omit<
    InputCoreProps,
    'onChange' | 'value' | 'onBur' | 'defaultValue' | 'type' | 'ref'
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

export const InputText = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  ...props
}: InputTextProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error, isTouched },
  } = useController({
    name,
    control,
  })

  console.log(error, isTouched)

  return (
    <div className="flex w-full min-w-fit flex-col">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <InputCore
        id={`input-${name}`}
        onChange={onChange}
        ref={ref}
        disabled={disabled}
        onBlur={onBlur}
        name={name}
        value={value}
        className={'border-green'}
        {...props}
      />
      <ErrorMessage error={error?.message} />
    </div>
  )
}
