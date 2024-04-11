import classNames from 'classnames'
import { useController, type FieldValues, type Path } from 'react-hook-form'

import { useFormError } from '@/components/core/hooks'
import { Input } from '@/components/core/presentationals'

export interface FormMoneyProps<TFieldValues extends FieldValues> {
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

export const FormMoney = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
}: FormMoneyProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  const errorMsg = useFormError(error)

  return (
    <Input error={errorMsg} label={label}>
      <Input.Money
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ''}
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        className={classNames('h-5', {
          'text-right': value != null && String(value).length > 0,
        })}
      />
    </Input>
  )
}
