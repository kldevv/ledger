import { useTranslation } from 'next-i18next'

import { CategoryType } from '@/api/graphql'
import {
  Form,
  InputText,
  SubmitButton,
  CategoryTypeFormDropdown,
  Card,
} from '@/components/common'
import { useForm } from '@/hooks'
import { addCategorySchema } from '@/shared'

import type { FormProps } from '@/components/common'
import type { z } from 'zod'

export type CategoryFormFieldValues = z.infer<typeof addCategorySchema>

export interface CategoryFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<CategoryFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Dynamically change form values
   */
  values?: CategoryFormFieldValues
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('category')

  const context = useForm<CategoryFormFieldValues>({
    schema: addCategorySchema,
    defaultValues: {
      name: '',
      type: CategoryType.ASSETS,
    },
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <Card>
        <div className="flex w-60 flex-col space-y-3">
          <InputText<CategoryFormFieldValues>
            name="name"
            label={t('CategoryForm.name')}
          />
          <CategoryTypeFormDropdown<CategoryFormFieldValues> name="type" />
        </div>
      </Card>
      <SubmitButton className="mt-8">{onSubmitText}</SubmitButton>
    </Form>
  )
}
