import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  Form,
  InputText,
  SubmitButton,
  Card,
  CategoryFormDropdown,
} from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'

export const upsertAccountFormSchema = z.object({
  /**
   * Account category
   */
  categoryId: z.string(),
  /**
   * Account name
   */
  name: z.string().min(1).max(50),
})

export type AccountFormFieldValues = z.infer<typeof upsertAccountFormSchema>

export interface AccountFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<AccountFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Dynamically change form values
   */
  values?: AccountFormFieldValues
}

export const AccountForm: React.FC<AccountFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('account')

  const context = useForm<AccountFormFieldValues>({
    schema: upsertAccountFormSchema,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <Card>
        <div className="flex w-60 flex-col space-y-3">
          <InputText<AccountFormFieldValues>
            name="name"
            label={t('AccountForm.label.name')}
          />
          <CategoryFormDropdown<AccountFormFieldValues> name="categoryId" />
        </div>
      </Card>
      <SubmitButton className="mt-8">{onSubmitText}</SubmitButton>
    </Form>
  )
}
