import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { Card, Form, InputText, SubmitButton } from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'

export const tagFormSchema = z.object({
  /**
   * Tag name
   */
  name: z.string().min(1).max(50),
})

export type TagFormFieldValues = z.infer<typeof tagFormSchema>

export interface TagFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<TagFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  values?: TagFormFieldValues
}

export const TagForm: React.FC<TagFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('tag')

  const context = useForm<TagFormFieldValues>({
    schema: tagFormSchema,
    defaultValues: {
      name: '',
    },
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <Card>
        <div className="flex w-60 flex-col">
          <InputText<TagFormFieldValues>
            name="name"
            label={t`TagForm.label.name`}
          />
        </div>
      </Card>
      <SubmitButton className="mt-8">{onSubmitText}</SubmitButton>
    </Form>
  )
}
