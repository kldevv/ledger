import { useController, type FieldValues, type Path } from 'react-hook-form'

import { useFormError } from '@/components/core/hooks'
import { Input } from '@/components/core/presentationals'

export interface FormStaticProps<TFieldValues extends FieldValues> {
  /**
   * Input label
   */
  label: string
  /**
   * Input name
   */
  name: Path<TFieldValues>
}

export const FormStatic = <TFieldValues extends FieldValues>({
  name,
  label,
}: FormStaticProps<TFieldValues>) => {
  const {
    field: { value },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  const errorMsg = useFormError(error)

  return (
    <Input error={errorMsg} label={label} className="border-0">
      <Input.Static className="h-5">{value}</Input.Static>
    </Input>
  )
}
