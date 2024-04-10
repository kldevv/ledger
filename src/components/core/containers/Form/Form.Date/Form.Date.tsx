import { useController, type FieldValues, type Path } from 'react-hook-form'

import { useFormError } from '@/components/core/hooks'
import { Input } from '@/components/core/presentationals'

export interface FormDateProps<TFieldValues extends FieldValues> {
  /**
   * Input label
   */
  label?: string
  /**
   * Input name
   */
  name: Path<TFieldValues>
  /**
   * Input placeholder
   */
  placeholder?: string
}

export const FormDate = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
}: FormDateProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  const errorMsg = useFormError(error)

  return (
    <Input error={errorMsg} label={label}>
      <Input.Date
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ''}
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        className="h-5"
      />
    </Input>
  )
}
