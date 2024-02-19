import { useTranslation } from 'next-i18next'

import {
  Form,
  InputText,
  SubmitButton,
  CategoryTypeFormDropdown,
} from '@/components/common'
import { useForm } from '@/hooks'
import { addCategorySchema, addCategorySchemaDefaultValues } from '@/shared'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'
import type { UpsertCategoryFormFieldValues } from '@/shared'

export interface UpsertCategoryFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertCategoryFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  values?: UseFormProps<UpsertCategoryFormFieldValues>['values']
}

export const UpsertCategoryForm: React.FC<UpsertCategoryFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('category')

  const context = useForm<UpsertCategoryFormFieldValues>({
    schema: addCategorySchema,
    defaultValues: addCategorySchemaDefaultValues,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<UpsertCategoryFormFieldValues>
          name="name"
          label={t('UpsertCategoryForm.label.name')}
        />
        <CategoryTypeFormDropdown<UpsertCategoryFormFieldValues> name="type" />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
