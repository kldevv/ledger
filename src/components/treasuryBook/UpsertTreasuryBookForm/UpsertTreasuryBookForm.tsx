import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { Currency } from '@/api/graphql'
import {
  Form,
  InputText,
  SubmitButton,
  CurrencyFormDropdown,
} from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'

export const upsertTreasuryBookFormSchema = z.object({
  /**
   * TreasuryBook name
   */
  name: z.string().min(1).max(50),
  /**
   * TreasuryBook currency
   */
  currency: z.nativeEnum(Currency),
})

export type UpsertTreasuryBookFormFieldValues = z.infer<
  typeof upsertTreasuryBookFormSchema
>

export interface UpsertTreasuryBookFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertTreasuryBookFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  defaultValues: UseFormProps<UpsertTreasuryBookFormFieldValues>['defaultValues']
}

export const UpsertTreasuryBookForm: React.FC<UpsertTreasuryBookFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('treasuryBook')

  const context = useForm<UpsertTreasuryBookFormFieldValues>({
    schema: upsertTreasuryBookFormSchema,
    defaultValues,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<UpsertTreasuryBookFormFieldValues>
          name="name"
          label={t('UpsertTreasuryBookForm.label.name')}
        />
        <CurrencyFormDropdown<UpsertTreasuryBookFormFieldValues> name="currency" />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
