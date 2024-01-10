import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { Form, InputText, SubmitButton } from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'

export const upsertTagFormSchema = z.object({
  /**
   * Tag name
   */
  name: z.string().min(1).max(50),
})

export type UpsertTagFormFieldValues = z.infer<typeof upsertTagFormSchema>

export interface UpsertTagFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertTagFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  values?: UseFormProps<UpsertTagFormFieldValues>['values']
}

export const UpsertTagForm: React.FC<UpsertTagFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('tag')

  const context = useForm<UpsertTagFormFieldValues>({
    schema: upsertTagFormSchema,
    defaultValues: {
      name: '',
    },
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<UpsertTagFormFieldValues>
          name="name"
          label={t('UpsertTagForm.label.name')}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
