import { useGetCategoriesQuery } from '@/api/graphql'
import type { FormProps } from '@/components/common'
import { Form, InputText, ListBox, SubmitButton } from '@/components/common'
import type { UseFormProps } from '@/hooks'
import { useForm, useVaultContext } from '@/hooks'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { z } from 'zod'

export const schema = z.object({
  /**
   * Account category
   */
  categoryId: z.string(),
  /**
   * Account name
   */
  name: z.string().min(1).max(50),
})

export type FieldValues = z.infer<typeof schema>

export interface UpsertAccountFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<FieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  values?: UseFormProps<FieldValues>['values']
}

export const UpsertAccountForm: React.FC<UpsertAccountFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('account')

  const context = useForm<FieldValues>({
    schema,
    defaultValues: {
      name: '',
      categoryId: '',
    },
    values,
  })

  const [{ curVaultId }] = useVaultContext()
  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  })

  const categoryOptions = useMemo(
    () =>
      data?.getCategories.map(({ id, name }) => ({ value: id, label: name })) ??
      [],
    [data],
  )

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<FieldValues>
          name="name"
          label={t('UpsertAccountForm.label.name')}
        />
        <ListBox<FieldValues>
          name="categoryId"
          label={t('UpsertAccountForm.label.categoryId')}
          options={categoryOptions}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
