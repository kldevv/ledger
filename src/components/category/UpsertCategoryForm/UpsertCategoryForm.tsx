import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { z } from 'zod'

import { CategoryType } from '@/api/graphql'
import { Form, InputText, Dropdown, SubmitButton } from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'

export const upsertCategoryFormSchema = z.object({
  /**
   * Category name
   */
  name: z.string().min(1).max(50),
  /**
   * Category type
   */
  type: z.nativeEnum(CategoryType),
})

export type UpsertCategoryFormFieldValues = z.infer<
  typeof upsertCategoryFormSchema
>

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
    schema: upsertCategoryFormSchema,
    defaultValues: {
      name: '',
      type: CategoryType.ASSETS,
    },
    values,
  })

  const typeOptions = useMemo(
    () => Object.values(CategoryType).map((value) => ({ value, label: value })),
    [],
  )

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<UpsertCategoryFormFieldValues>
          name="name"
          label={t('UpsertCategoryForm.label.name')}
        />
        <Dropdown<UpsertCategoryFormFieldValues>
          name="type"
          label={t('UpsertCategoryForm.label.type')}
          options={typeOptions}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
