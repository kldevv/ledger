import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { z } from 'zod'

import { useGetCategoriesQuery } from '@/api/graphql'
import { Form, InputText, Dropdown, SubmitButton } from '@/components/common'
import { useForm, useTreasuryBookContext } from '@/hooks'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'

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

export type UpsertAccountFormFieldValues = z.infer<
  typeof upsertAccountFormSchema
>

export interface UpsertAccountFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertAccountFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  values?: UseFormProps<UpsertAccountFormFieldValues>['values']
}

export const UpsertAccountForm: React.FC<UpsertAccountFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('account')

  const context = useForm<UpsertAccountFormFieldValues>({
    schema: upsertAccountFormSchema,
    defaultValues: {
      name: '',
      categoryId: '',
    },
    values,
  })

  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
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
        <InputText<UpsertAccountFormFieldValues>
          name="name"
          label={t('UpsertAccountForm.label.name')}
        />
        <Dropdown<UpsertAccountFormFieldValues>
          name="categoryId"
          label={t('UpsertAccountForm.label.categoryId')}
          options={categoryOptions}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
