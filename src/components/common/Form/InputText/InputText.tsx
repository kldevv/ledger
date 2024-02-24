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
    fieldState: { error, isDirty, isTouched },
  } = useController({
    name,
    control,
  })

  return (
    <div className="flex flex-col">
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <InputCore
        id={`input-${name}`}
        onChange={onChange}
        ref={ref}
        disabled={disabled}
        onBlur={onBlur}
        name={name}
        value={value}
        className={
          isDirty && isTouched
            ? error == null
              ? 'border-green'
              : 'border-red'
            : undefined
        }
        {...props}
      />
      <ErrorMessage error={error?.message} />
    </div>
  )
}
