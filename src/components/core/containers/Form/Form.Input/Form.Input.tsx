import { useController, type FieldValues, type Path } from 'react-hook-form'

import { Input } from '@/components/core/presentationals'

export interface FormInputProps<TFieldValues extends FieldValues> {
  /**
   * Input label
   */
  label: string
  /**
   * Input name
   */
  name: Path<TFieldValues>
}

export const FormInput = <TFieldValues extends FieldValues>({
  name,
}: FormInputProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  return (
    <Input error={error?.message}>
      <Input.Text
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ''}
        ref={ref}
        disabled={disabled}
      />
    </Input>
  )
}
